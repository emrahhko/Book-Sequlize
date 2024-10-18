import db from '../models/index.js';

const Book = db.books;

const bookControllers = {
    getAll : async(req, res) => {
        const books = await Book.findAll();
        res.status(200).json(books);
    },
    getOne : async(req, res) => {
        const { id } = req.params;
        const book = await Book.findOne({id : id});
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: `book with id ${id} not found`});
        }
    },
    create : async(req, res) => {
        const {title, author, price, img, user_id} = req.body;
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
    update : async(req, res) => {},
    remove : async(req, res) => {}
};

export default bookControllers;
