const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb://localhost:27017/music', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// Create Schema
const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    Singer: String,
    Actor: String,
    Actress: String
});

const Song = mongoose.model('songdetails', songSchema);

// Insert 5 songs (only first time)
app.get('/insert', async (req, res) => {
    await Song.deleteMany({}); // clear previous if any
    await Song.insertMany([
        { Songname: "Song1", Film: "Film1", Music_director: "Director1", Singer: "Singer1" },
        { Songname: "Song2", Film: "Film2", Music_director: "Director2", Singer: "Singer2" },
        { Songname: "Song3", Film: "Film1", Music_director: "Director1", Singer: "Singer2" },
        { Songname: "Song4", Film: "Film3", Music_director: "Director3", Singer: "Singer3" },
        { Songname: "Song5", Film: "Film2", Music_director: "Director2", Singer: "Singer1" }
    ]);
    res.send('5 Songs Inserted!');
});

// Display total count and all songs
app.get('/songs', async (req, res) => {
    const songs = await Song.find();
    const count = await Song.countDocuments();

    let html = `<h1>Total Songs: ${count}</h1><table border="1"><tr><th>Songname</th><th>Film</th><th>Music Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>`;
    songs.forEach(song => {
        html += `<tr><td>${song.Songname}</td><td>${song.Film}</td><td>${song.Music_director}</td><td>${song.Singer}</td><td>${song.Actor || ''}</td><td>${song.Actress || ''}</td></tr>`;
    });
    html += '</table>';
    res.send(html);
});

// List songs by Music Director
app.get('/director/:name', async (req, res) => {
    const songs = await Song.find({ Music_director: req.params.name });
    res.json(songs);
});

// List songs by Music Director and Singer
app.get('/director/:director/singer/:singer', async (req, res) => {
    const songs = await Song.find({ Music_director: req.params.director, Singer: req.params.singer });
    res.json(songs);
});

// Delete a song (specify song name in URL)
app.delete('/delete/:songname', async (req, res) => {
    await Song.deleteOne({ Songname: req.params.songname });
    res.send('Song Deleted');
});

// Add a new favorite song
app.post('/add', async (req, res) => {
    const song = new Song(req.body);
    await song.save();
    res.send('New Song Added');
});

// List songs by Singer and Film
app.get('/singer/:singer/film/:film', async (req, res) => {
    const songs = await Song.find({ Singer: req.params.singer, Film: req.params.film });
    res.json(songs);
});

// Update song with Actor and Actress (specify song name in URL)
app.put('/update/:songname', async (req, res) => {
    await Song.updateOne({ Songname: req.params.songname }, { Actor: req.body.Actor, Actress: req.body.Actress });
    res.send('Song Updated');
});

// Start Server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
