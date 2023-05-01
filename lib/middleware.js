const express = require("express");
let app = express();
let session = require("express-session");

const credentials = require("../credentials");

let middleware = {

    loginRequired: function (req, res, next) {

        // Check if the user is logged in
        if (req.session.user) {
            next();
        } else {
            res.redirect("/login");
        }
    },

    populateFormData: function (req, res, next) {
        res.locals.user = req.session.user;
        next();
    },

    flashMessages: function(req, res, next) {
        // if there's a flash message, transfer
        // it to the context, then clear it

        res.locals.flash = req.session.flash;
        delete req.session.flash;
        next();
    }
};

module.exports = middleware;