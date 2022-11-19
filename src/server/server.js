const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');


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

app.post('/api/search', (req, res) => {

  console.log(req.body);
  console.log(books);

  var config = {
    method: 'get',
    url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${req.body.isbn}`,
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    var isbnLookup = JSON.parse(JSON.stringify(response.data.items[0].volumeInfo));
    var title = isbnLookup.title;
    var author = isbnLookup.authors[0];
    books.push({title: title, author: author});
    console.log(books);
  })
  .catch(function (error) {
    console.log(error);
  });

});



app.listen(port, () => console.log(`Listening on port ${port}`));