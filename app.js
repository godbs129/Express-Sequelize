const express = require('express');
const cors = require('cors');
const app = express();

const api = require('./api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(api);

app.listen(8080, () => {
    console.log('Server start');
})