const express = require('express')
const router = express.Router()

const passport = require("passport")


router.get('/', (req, res) => res.send('You are not logged in'))
router.get('/failed', (req, res) => res.send('Failed to log in!!!'))
router.get('/good', (req, res) => res.send('Welcome Page'))
// router.get('/good', (req, res) => { console.log("this", `${req}`) })
// router.get('/good', (req, res) => res.send(`Welcome ${req.user.displayName}`))



router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/googleAuth/failed' }),
    function (req, res) {
        console.log(req.user.id)
        // Successful authentication, redirect home.
        res.redirect('/googleAuth/good');
    });

router.get('/logout', (req, res) => {
    req.session = null
    //req.logOut()
    res.redirect('/googleAuth')
})


module.exports = router;