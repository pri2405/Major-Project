const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

// signup
router.get("/signup", userController.renderSignupForm);

router.post("/signup", 
    wrapAsync(userController.createUser));

// login
router.get("/login", wrapAsync(userController.renderLoginForm));

router.post("/login", 
    saveRedirectUrl,
    passport.authenticate('local', {  
        failureRedirect: '/login',
        failureFlash: true,
    }) ,
    userController.afterLogin
);                     

// log out
router.get("/logout", userController.logout)

module.exports = router;