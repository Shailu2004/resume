const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bookstore');

const Book = mongoose.model('Book', new mongoose.Schema ({
  title: String, 
  author: String, 
  price: Number, 
  genre: String
}));

const app = express();
app.use(express.json());

app.post('/books', (req, res) => Book.create(req.body).then(res.send.bind(res)));

app.get('/books', (_, res) => Book.find().then(res.send.bind(res)));

app.put('/books/:id', (req, res) => 
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(res.send.bind(res))
);

app.delete('/books/:id', (req, res) => 
  Book.findByIdAndDelete(req.params.id).then(() => res.send({ message: 'Book deleted' }))
);

app.listen(3000, () => console.log('Server running on 3000'));
