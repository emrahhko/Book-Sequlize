import jwt from 'jsonwebtoken';
import { render } from 'ejs';
import db from '../models/index.js';
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPassword from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';

const User = db.users;

const userControllers = {
    getRegisterForm: async (req, res) => {
        res.status(200).render('register-form');
    },
    register: async (req, res) => {
        const { email, password, rePassword } = req.body;
        const userExist = await User.findOne({ where: { email: email } });

        if (userExist) {
            return res.status(400).send('User already exists');
        }

        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);
        const doPasswordMatch = matchPassword(password, rePassword);

        if (isValidEmail && isValidPassword && doPasswordMatch) {
            const hashedPassword = hashPassword(password);

            const newUser = {
                email: email,
                password: hashedPassword
            };

            const user = await User.create(newUser);
            res.status(302).redirect('/api/login');
        }
    },

    getLoginForm: (req, res) => {
        res.status(200).render('login-form');
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const userExist = await User.findOne({ where: { email: email } });
        if (!userExist) {
            return res.status(404).send('invalid email or password');
        }

        // const hashedPassword = hashPassword(password);
        const doPasswordMatch = userExist.password === hashedPassword;

        if (doPasswordMatch) {
            const token = jwt.sign({ email }, process.env.TOKEN_SECRET, {
                expiresIn: '1h'
            });

            res.cookie('token', token, { httpOnly: true });

            return res.status(302).redirect('/api/book');
        } else {
            return res.status(404).send('invalid email or password');
        }
    },

    logout: (req, res) => {
        res.clearCookie('token');
        res.status(302).redirect('/api/book');
    },

    getLogin: async (req, res) => {},
    postLogin: async (req, res) => {},
    getLogout: async (req, res) => {}
};

export default userControllers;
