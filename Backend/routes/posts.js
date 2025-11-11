const express = require('express');
const multer = require('multer');
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;
    const q = {};
    if (search) q.$or = [
      { title: new RegExp(search, 'i') },
      { body: new RegExp(search, 'i') },
      { tags: new RegExp(search, 'i') }
    ];
    if (category) q.categories = category;
    const skip = (parseInt(page)-1) * parseInt(limit);
    const posts = await Post.find(q)
      .populate('author', 'name')
      .populate('categories', 'name')
      .sort({ createdAt: -1 })
      .skip(skip).limit(parseInt(limit));
    const total = await Post.countDocuments(q);
    res.json({ data: posts, meta: { total, page: parseInt(page), limit: parseInt(limit) } });
  } catch (err) { next(err); }
});

router.get('/:id', [ param('id').isMongoId() ], validate, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('categories', 'name');
    if (!post) return res.status(404).json({ message: 'Not found' });
    const comments = await Comment.find({ post: post._id }).populate('author','name');
    res.json({ post, comments });
  } catch (err) { next(err); }
});

router.post('/', auth, upload.single('featuredImage'), [
  body('title').notEmpty(),
  body('body').notEmpty()
], validate, async (req, res, next) => {
  try {
    const featuredImage = req.file ? `/uploads/${req.file.filename}` : undefined;
    const post = await Post.create({
      title: req.body.title,
      body: req.body.body,
      featuredImage,
      author: req.user.id,
      categories: req.body.categories ? req.body.categories.split(',') : []
    });
    res.status(201).json(post);
  } catch (err) { next(err); }
});

router.put('/:id', auth, upload.single('featuredImage'), [
  param('id').isMongoId()
], validate, async (req, res, next) => {
  try {
    const update = { ...req.body };
    if (req.file) update.featuredImage = `/uploads/${req.file.filename}`;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    Object.assign(post, update);
    await post.save();
    res.json(post);
  } catch (err) { next(err); }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await post.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
