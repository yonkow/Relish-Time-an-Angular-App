const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser');
const routes = require('./routes');
const { authMiddleware } = require('./middlewares/authMiddleware');
const { errorandler } = require('./middlewares/errorMiddleware');

const app = express();
// app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));
app.use(express.json());
app.use(authMiddleware);

app.use(routes);
app.use(errorandler);

mongoose
    .connect(`mongodb://127.0.0.1:27017/recipes-book`)
    .then(() => {
        console.log('DB is connected');

        app.listen(3000, () => {
            console.log(`App is listening on port 3000...`);
        });
    })
    .catch((err) => {
        console.log('Cannot connect to DB...');
        console.log(err.message);
    });
