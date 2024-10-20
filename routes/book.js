import express from 'express';

const router = express.Router();

import bookControllers from '../controllers/book.js';
// routes

const { getAll, getOne, create, getCreateForm, update, remove, getBookByUser } =
    bookControllers;

router.get('/book', getAll);
router.get('/book/:id', getOne);
router.get('add-book', getCreateForm);
router.post('add-book', create);
router.put('/book/:id', update);
router.delete('/book/:id', remove);
router.get('/bookByUser/:id', getBookByUser);

export default router;
