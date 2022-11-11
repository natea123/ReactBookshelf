const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

books = []

app.get('/api/books', (req, res) => {
  
    res.send(books);
});

app.post('/api/books', (req, res) => {

  books.push(req.body);
  console.log(books);
});

app.listen(port, () => console.log(`Listening on port ${port}`));