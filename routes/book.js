import express from 'express';

const router = express.Router();

import bookControllers from '../controllers/book.js';
// routes

const {getAll, getOne, create, update, remove} = bookControllers;

router.get('/book', getAll);
router.get('/book/:id', getOne);
router.post('/book', create);
router.put('/book/:id', update);
router.delete('/book/:id', remove)

export default router;
