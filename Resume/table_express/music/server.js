const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/music', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const Song = mongoose.model('Song', new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    Singer: String,
    Actor: String,
    Actress: String
}));


app.post('/songs', (req, res) => 
    Song.create(req.body).then(res.send.bind(res))
);


app.get('/songs', (_, res) => 
    Song.find().then(data =>
        res.send({ total: data.length, songs: data })
    )
);


app.get('/songs/by-director', (_, res) => {
    Song.find({ Music_director: "A.R. Rahman" })
        .then(res.send.bind(res));
});


app.get('/songs/by-director-singer', (_, res) => {
    Song.find({
        Music_director: "A.R. Rahman",
        Singer: "Shreya Ghoshal"
    }).then(res.send.bind(res));
});


app.delete('/songs/:id', (req, res) =>
    Song.findByIdAndDelete(req.params.id)
        .then(() => res.send({ message: "Song deleted" }))
);


app.post('/songs/favorite', (req, res) => 
    Song.create(req.body).then(res.send.bind(res))
);


app.get('/songs/by-film-singer', (_, res) => {
    Song.find({
        Film: "Rockstar",
        Singer: "Mohit Chauhan"
    }).then(res.send.bind(res));
});


app.put('/songs/:id', (req, res) => 
    Song.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(res.send.bind(res))
);


app.get('/songs/table', (_, res) =>
    Song.find().then(data => {
        let table = `
            <table border="1" cellpadding="5">
                <tr>
                    <th>Song Name</th><th>Film</th><th>Music Director</th>
                    <th>Singer</th><th>Actor</th><th>Actress</th>
                </tr>`;
        data.forEach(s => {
            table += `<tr>
                <td>${s.Songname}</td>
                <td>${s.Film}</td>
                <td>${s.Music_director}</td>
                <td>${s.Singer}</td>
                <td>${s.Actor || '-'}</td>
                <td>${s.Actress || '-'}</td>
            </tr>`;
        });
        table += `</table>`;
        res.send(table);
    })
);

// Start the server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
