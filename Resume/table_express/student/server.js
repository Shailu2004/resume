const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/student');

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
        res.send({ total: data.length, students: data })
    )
);


app.get('/students/dsbda20', (_, res) =>
    Student.find({ DSBDA_Marks: { $gt: 20 } })
        .then(data => res.send(data.map(s => s.Name)))
);


app.put('/students/:id', (req, res) => 
    Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(res.send.bind(res))
);


app.get('/students/above25', (_, res) =>
    Student.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_Marks: { $gt: 25 }
    }).then(data => res.send(data.map(s => s.Name)))
);


app.get('/students/less40mathsci', (_, res) =>
    Student.find({
        WAD_Marks: { $lt: 40 },
        CNS_Marks: { $lt: 40 }
    }).then(data => res.send(data.map(s => s.Name)))
);


app.delete('/students/:id', (req, res) =>
    Student.findByIdAndDelete(req.params.id)
        .then(() => res.send({ message: "Student Deleted" }))
);


app.get('/students/table', (_, res) =>
    Student.find().then(data => {
        let table = `
            <table border="1" cellpadding="5">
                <tr>
                    <th>Name</th><th>Roll No</th><th>WAD</th><th>DSBDA</th>
                    <th>CNS</th><th>CC</th><th>AI</th>
                </tr>`;
        data.forEach(s => {
            table += `<tr>
                <td>${s.Name}</td>
                <td>${s.Roll_No}</td>
                <td>${s.WAD_Marks}</td>
                <td>${s.DSBDA_Marks}</td>
                <td>${s.CNS_Marks}</td>
                <td>${s.CC_Marks}</td>
                <td>${s.AI_Marks}</td>
            </tr>`;
        });
        table += `</table>`;
        res.send(table);
    })
);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
