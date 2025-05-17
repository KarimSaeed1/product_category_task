const express = require('express');
const router = express.Router();

// Controller
const {
    getAll,
    getOne,
    create,
    update,
    remove
} = require('../controllers/category');

// GET
router.get('/', getAll);
router.get('/:id', getOne);


// POST
router.post('/', create);


// PATCH
router.patch('/:id', update);


// DELETE
router.delete('/:id', remove);



module.exports = router;