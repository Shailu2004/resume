const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/DB');

const Student = mongoose.model('Student', new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_Marks: Number
}));


app.post('/students', (req, res) =>
    Student.create(req.body).then(res.send.bind(res))
);

app.get('/students', (_, res) =>
    Student.find().then(data =>
        res.send({ Count: data.length, Students: data }))
)

app.get('/students/dsbda20', (req, res) =>
    Student.find({DSBDA_Marks : {$gt: 20}}).then(data=>
        res.send(data.map(s=>(s.Name)))
    )
);

app.put('/students/:id', (req, res) => 
    Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(res.send.bind(res))
);

app.delete('/students/:id', (req, res) => 
    student.findByIdAndDelete(req.params.id).then(() => res.send({ message: 'Student deleted' }))
);
  
app.listen(3000);