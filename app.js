const express = require('express')
const app = express()

const passport = require('passport')
const cookieSession = require('cookie-session')
require('./api/middleware/passport-setup')


const userRoutes = require('./api/routes/users')
const quizRoutes = require('./api/routes/quiz')
const googleAuthRoutes = require('./api/routes/googleAuth')

app.use(express.json())


app.use(userRoutes)
app.use(quizRoutes)
app.use('/googleAuth', googleAuthRoutes)


app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app