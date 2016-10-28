const express = require('express');
const parser = require('body-parser');

const app = express();
const technoDoc = require('techno-gendoc');
const path = require('path');

const technolibs = require('technolibs');

app.use('/', express.static('public', { maxAge: 1 }));
app.use('/chat', express.static('public', { maxAge: 1 }));
app.use('/registration', express.static('public', { maxAge: 1 }));

technoDoc.generate(require('./api'), 'public');

app.use(parser.json());
app.use('/libs', express.static('node_modules'));

app.get('/api/session', (req, res) => {
  res.send(technoDoc.mock(require('./api/scheme/Session')));
});

app.post('/api/session', (req, res) => {
  res.send(technoDoc.mock(require('./api/scheme/Session')));
});


app.post('/api/messages', (req, res) => {
  technolibs.publish(req.body).then(body => res.json(req.body));
});

app.get('/api/messages', (req, res) => {
  res.send([
    technoDoc.mock(require('./api/scheme/Message')),
    technoDoc.mock(require('./api/scheme/Message')),
    technoDoc.mock(require('./api/scheme/Message')),
    technoDoc.mock(require('./api/scheme/Message')),
  ]);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App started on port ${process.env.PORT || 3000}`);
});
