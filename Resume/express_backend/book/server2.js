const express=require('express');
const mongoose=require('mongoose');

const app=express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/booksmine');

const Book = mongoose.model('Book', new mongoose.Schema({
      title: String,
      author: String,
      price: Number,
      desc: String
}));

app.post('/books' , (req,res) => 
    Book.create(req.body).then(res.send.bind(res))
);

app.get('/books', (_,res)=>
    Book.find().then(res.send.bind(res))
);

app.put('/books/:id', (req,res)=>
    Book.findByIdAndUpdate(req.params.id , req.body, {new :true}).then(res.send.bind(res))
);

app.delete('/books/:id', (req,res)=>
    Book.findByIdAndDelete(req.params.id).then( ()=> res.send({message:"Book Deleted"}))
);

app.listen(3000);
