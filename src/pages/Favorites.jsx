import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleRemoveFavorite = (imdbID) => {
    
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 
  };

  if (favorites.length === 0) {
    return (
      <Container className="mt-4">
        <h1>Favorites</h1>
        <p>Nothing here.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Favorites</h1>
      <Row>
        {favorites.map((movie) => (
          <Col key={movie.imdbID} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Button as={Link} to={`/movie/${movie.imdbID}`} variant="info">
                  Details
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveFavorite(movie.imdbID)} 
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Favorites;
