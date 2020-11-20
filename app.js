const express = require('express');
const app = express();

const api = require('./api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(api);

app.listen(8080, () => {
    console.log('Server start');
})