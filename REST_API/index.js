const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');
const { authMiddleware } = require('./middlewares/authMiddleware');
const { errorandler } = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.get('/data/catalog', (req, res) => {
    res.json([]);
});

app.use(routes);
app.use(errorandler);

mongoose
    .connect(`mongodb://127.0.0.1:27017/relish-time`)
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
