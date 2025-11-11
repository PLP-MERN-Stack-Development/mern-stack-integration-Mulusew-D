const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const Category = require('../models/Category');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const cats = await Category.find().sort('name');
    res.json(cats);
  } catch (err) { next(err); }
});

router.post('/', [ body('name').notEmpty() ], validate, async (req, res, next) => {
  try {
    const cat = await Category.create({ name: req.body.name });
    res.status(201).json(cat);
  } catch (err) { next(err); }
});

module.exports = router;
