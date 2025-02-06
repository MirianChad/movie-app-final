import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function MovieDetails() {
  const { id } = useParams(); // ფილმის ID-ს აღება URL-დან
  const [movie, setMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // წამოიღეთ ფილმის დეტალები OMDb API-დან
    axios
      .get(`http://www.omdbapi.com/?apikey=a96a1636&i=${id}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error(error));

    // მიიღეთ ფავორიტები LocalStorage-დან
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, [id]);

  const handleAddFavorite = (movie) => {
    // თუ ფილმი უკვე არ არის ფავორიტებში, დაამატეთ
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (!movie) return <div>Loading...</div>; // თუ ფილმი ჯერ არ ჩატვირთულა

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
          </Card>
        </Col>
        <Col md={8}>
          <h1>{movie.Title}</h1>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <Button variant="secondary" onClick={() => window.history.back()}>
            Back to Home
          </Button>
          <Button
            variant="warning"
            onClick={() => handleAddFavorite(movie)}
            disabled={favorites.some((fav) => fav.imdbID === movie.imdbID)} // თუ უკვე ფავორიტია, არ დააჭირო
          >
            {favorites.some((fav) => fav.imdbID === movie.imdbID) ? "Already Favorite" : "Add to Favorites"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieDetails;
