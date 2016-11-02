const express = require('express');
const parser = require('body-parser');

const app = express();
const path = require('path');

app.use('/', express.static('public', { maxAge: 1 }));
app.use('/chat', express.static('public', { maxAge: 1 }));
app.use('/registration', express.static('public', { maxAge: 1 }));
app.use('/leaderboard', express.static('public', { maxAge: 1 }));
app.use('/menu', express.static('public', { maxAge: 1 }));

app.use(parser.json());

app.listen(process.env.PORT || 3000, () => {
  console.log(`App started on port ${process.env.PORT || 3000}`);
});
