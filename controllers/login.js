const mongoose = require('mongoose');
const User = mongoose.model('User');

// Bcrypt for password encryption
const bcrypt = require('bcrypt');

const login = {
        login: (req, res) => res.render('login'),

        processLogin: async (req, res) => {
            // console.log(req.body);
            if (req.body && req.body.username && req.body.password) {
                const username = req.body.username;
                const password = req.body.password;
                const user = await User.findOne({ username: username }).lean();
    
                if (user && user.password) {
                    bcrypt.compare(password, user.password, (err, passwordMatch) => {
                        if (passwordMatch) {
                        req.session.user = user;
                        // console.log(req.session.user); // Use this if you want to check if the session is being saved
                        res.redirect('/');
                        } else {
                            req.session.flash = {
                                type: 'fail',
                                intro: "Username or password do not match",
                                message: "Username or password do not match",
                            };
                            res.redirect('/login');
                        }
                    });
                }else if(user == null) {
                    req.session.flash = {
                        type: 'fail',
                        intro: "Username or password field not entered",
                        message: "Username or password field not entered",
                    };
                    res.redirect('/login');
                }
            } else if (req.body == null) {
                req.session.flash = {
                    type: 'fail',
                    intro: "Username or password field not entered",
                    message: "Username or password field not entered",
                };
                res.redirect('/login');
            }
        },

        // Log the user out by deleting their session, then redirect them home
        processLogout: function(req, res) {
            if(req.session && req.session.user) {
                delete req.session.user;
            }
            res.redirect('/');
        },

    };

module.exports = login;