const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// generate token for  jwt authentication
module.exports.tokenGenrate = (id, expiresIn) => {
    const token = jwt.sign({ id }, process.env.TOKENKEY, { expiresIn: expiresIn });
    return token;
};

// verify token for jwt authentication
module.exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKENKEY);
}

// bcrypt password
module.exports.hashPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10);
    const bcryptpassword = await bcrypt.hash(password, salt);
    return bcryptpassword;
};

// compare password
module.exports.comparePassword = async (userPassword, dbPassword) => {
    return await bcrypt.compare(userPassword, dbPassword);
};

// email address validation
module.exports.emailValidate = (email) => {
    const emailValidation = /^[a-z0-9._-]+@[a-z0-9.-]+.[a-z]+.[a-z0-9]{2,}$/;
    const emailValcheck = emailValidation.test(email);
    return emailValcheck;
}

// mobile number validation
module.exports.mobileValidate = (mobile) => {
    const mobileValidation = /^[0-9]{10,12}$/;
    const mobilevalcheck = mobileValidation.test(mobile)
    return mobilevalcheck;
}

// password validation
module.exports.passwordValidate = (password) => {
    const passwordValidate = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$\/\!#%*^?&])[a-zA-Z0-9\d@$\/\!#^%*?&]{8,}/;
    const passwordvalcheck = passwordValidate.test(password);
    return passwordvalcheck;
}