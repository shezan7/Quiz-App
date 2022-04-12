const app = require('./app');

const sequelize = require('./api/config/db');

const quizTable = require('./api/sequelize-models/Quiz')

// quizTable.sync({ force: true })

sequelize
    .authenticate()
    .then(() => {
        console.log("Database postgreSQL connected!!!");
        const port = process.env.PORT || 3000
        // const port = process.env.PORT
        app.listen(port, () => console.log(`Server running ${port}`))
    })

