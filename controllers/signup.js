const mongoose = require('mongoose');
const User = mongoose.model('User');

// Bcrypt for password encryption
const bcrypt = require('bcrypt');

const signup = {
    processSignup: async (req, res) => {
        if((req.body.password == req.body.passwordCheck) && (req.body.username == req.body.username)){
            let password = await bcrypt.hash(req.body.password, 12);
        await User.create({
            username: req.body.username,
            password: password
        }).catch((err) => {
            res.redirect('login');
            req.session.flash = {
                type: 'fail',
                intro: "Username or password do not match",
                message: "Username or password do not match",
            };
        });
        res.redirect('login');
        req.session.flash = {
            type: 'success',
            intro: "Account created",
            message: "Account has been successfully created",
        };
        return [];
    };
    res.redirect('login');
        req.session.flash = {
            type: 'fail',
            intro: "Non-filled out information",
            message: "Please fill all boxes for account creation",
        };
    },
    };

module.exports = signup;