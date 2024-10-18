import crypto from 'crypto';

function hashPassword(password) {
    return crypto
        .createHash('sha256')
        .update(password.toString())
        .digest('base64');
}

export default hashPassword;



// import bcrypt from 'bcrypt';

// const hashPassword = (password) => {
//     const salt = bcrypt.genSaltSync(10);
//     return bcrypt.hashSync(password, salt);
// };

// export default hashPassword;
