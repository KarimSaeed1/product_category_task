const express = require('express');
const router = express.Router();

// Controller
const {
    getAll,
    getOne,
    getByCategory,
    create,
    update,
    remove
} = require('../controllers/product');


// GET
router.get('/', getAll);
router.get('/:id', getOne);
router.get('/category/:categoryId', getByCategory);


// POST
router.post('/', create);


// PATCH
router.patch('/:id', update);

// DELETE
router.delete('/:id', remove);


module.exports = router;