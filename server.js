const app = require('./app');

const sequelize = require('./api/config/db');

sequelize
    .authenticate()
    .then(() => {
        console.log("Database postgreSQL connected!!!");
        const port = process.env.PORT
        app.listen(port, () => console.log(`Server running ${port}`))
    })

