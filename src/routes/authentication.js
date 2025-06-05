const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

// SIGNUP
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

// SINGIN
router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));

exports.userSignupValidator = async(req, res, next) => {
    // check for password
    await body('password', 'Se requiere una contraseña').notEmpty().run(req)
    await body('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters').run(req)
    // check for errors
    const errors = validationResult(req);
    console.log(errors.errors);
    // if error show the first one as they happen
    if (!errors.isEmpty()) {
        const firstError = errors.errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};






router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error during logout." });
    }
    res.status(200).json({ message: "Logout successful." });
  });
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

module.exports = router;