import db from '../models/index.js';

const Book = db.books;

const bookControllers = {
    getAll: async (req, res) => {
        try {
            const books = await Book.findAll();
            res.status(200).render('books', books);
        } catch (error) {
            res.status(500).send({
                message: 'Some error occurred'
            });
        }
    },
    getOne: async (req, res) => {
        const { id } = req.params;
        const book = await Book.findOne(where({ id }));
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: `book with id ${id} not found` });
        }
    },
    getCreateForm: (req, re) => {
        res.status(200).render('create-book');
    },
    create: async (req, res) => {
        const { title, author, price, img, user_id } = req.body;
        const newBook = {
            title: title,
            author: author,
            price: price,
            img: img,
            user_id: user_id
        };
        const book = await Book.create(newBook);
        res.status(201).json(book);
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { title, author, price, img } = req.body;
        try {
            const updatedBook = await Book.update(
                {
                    title,
                    author,
                    price,
                    img
                },
                where({ id })
            );
            res.status(200).send(updatedBook);
        } catch (err) {
            res.status(500).send({
                message: 'Error updating book'
            });
        }
    },
    remove: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedBook = await Book.destroy(where({ id }));
            res.status(200).send(deletedBook);
        } catch (err) {
            res.status(500).send({
                message: 'Error deleting book with id'
            });
        }
    },
    getBookByUser: async (req, res) => {
        const { id } = req.params;
        try {
            const book = await Book.findAll(where({ user_id: id }));
        } catch (err) {
            res.status(500).send({
                message: 'Error retrieving book'
            });
        }
    }
};

export default bookControllers;
