const app = require('./app')

const sequelize = require('./api/config/db');
const user = require('./api/sequelize-models/User');



sequelize
    .authenticate()
    .then(() => {
        console.log("Database postgreSQL connected!!!");
        const port = process.env.Port || 3000
        app.listen(port, () => console.log(`Server running ${port}`))
    })

