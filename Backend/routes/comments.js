const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');

const router = express.Router();

router.post('/', auth, [
  body('post').isMongoId(),
  body('body').notEmpty()
], validate, async (req, res, next) => {
  try {
    const comment = await Comment.create({
      post: req.body.post,
      author: req.user.id,
      body: req.body.body
    });
    res.status(201).json(comment);
  } catch (err) { next(err); }
});

module.exports = router;
