import React, {useState, useEffect} from "react";
import './App.css';
import Axios from 'axios';

function App() {
    const [movieName, setMovieName] = useState('');
    const [review, setReview] = useState('');
    const [newReview, setNewReview] = useState('');
    const [movieReviewsList, setMovieList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setMovieList(response.data);
        });
    }, []);

    const submitReview = () => {
        Axios.post('http://localhost:3001/api/insert', {
            movieName: movieName,
            movieReview: review
        });

        setMovieList([
            ...movieReviewsList,
            { movieName: movieName, movieReview: review },
        ]);
    };

    const deleteReview = (movie, id) => {
        Axios.delete('http://localhost:3001/api/delete/' + movie);
        setMovieList(movieReviewsList.filter(x => {
            return x.id != id;
        }));
    };

    const updateReview = (movie, id) => {
        Axios.put('http://localhost:3001/api/update', {
            movieName: movie,
            movieReview: newReview
        });
        movieReviewsList[movieReviewsList.map(function(e) { return e.movieName; }).indexOf(movie)].movieReview = newReview;
        setMovieList(movieReviewsList);
        document.getElementById('updateInput' + id).value = '';
        setNewReview("");
    };

    return <div className="App">
        <h1>CRUD APPLICATION</h1>

        <div className="form">
            <label>Movie Name:</label>
            <input className="formInput" type="text" name="movieName" onChange={(e) => {
                setMovieName(e.target.value)
            }}/>
            <label>Review:</label>
            <input className="formInput" type="text" name="review" onChange={(e) => {
                setReview(e.target.value)
            }}/>

            <button onClick={submitReview}>Submit</button>

            {movieReviewsList.map((val)=> {
                return <div className="card" key={val.id}>
                    <h1>{val.movieName}</h1>
                    <p>{val.movieReview}</p>

                    <button
                        onClick={() => {
                            deleteReview(val.movieName, val.id);
                        }}
                    >
                        Delete
                    </button>
                    <input type="text" className="updateInput" id={"updateInput" + val.id} onChange={(e) =>
                        setNewReview(e.target.value)
                    }/>
                    <button
                        onClick={() => {
                            updateReview(val.movieName, val.id);
                        }}
                    >
                        Update</button>
                </div>
            })
            }
        </div>
    </div>;
}

export default App;
