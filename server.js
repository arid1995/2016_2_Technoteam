let express = require('express');
let technologger = require('technologger');
let parser = require('body-parser');
let app = express();

app.use('/', express.static('public'));

app.use(parser.json());
app.use(technologger);

let emails = new Map();

app.post('/users', (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let counter = (emails.get(email) || 0);
    emails.set(email, counter + 1);
    res.send(counter.toString());
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
