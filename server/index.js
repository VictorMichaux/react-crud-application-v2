const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'reactcrud'
    }
);
db.connect();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const insertQuery = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)";

    db.query(insertQuery, [movieName, movieReview], (err, result) => {
        console.log(err);
    })
});

app.get('/api/get', (req, res) => {
    const getQuery = "SELECT * FROM movie_reviews";
    db.query(getQuery, (err, result) => {
        res.send(result);
    });
});

app.put('/api/update', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const insertQuery = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

    db.query(insertQuery, [movieReview, movieName], (err, result) => {
        console.log(err);
    });
});

app.delete('/api/delete/:movieName', (req, res) => {
    const movieName = req.params.movieName;

    const deleteQuery = "DELETE FROM movie_reviews WHERE movieName = ?";

    db.query(deleteQuery, movieName, (err, result) => {
        console.log(err);
    });
});

app.listen(3001, () => {
    console.log(`Example app listening on port 3001`)
});
