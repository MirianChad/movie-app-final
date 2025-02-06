import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

 
  const fetchMovies = (query = "movie") => {
    setLoading(true);
    setError(""); // clear any previous error

    axios
      .get(`https://www.omdbapi.com/?s=${query}&apikey=a96a1636`) 
      .then((response) => {
        if (response.data.Response === "False") {
          setError("No movies found");
          setMovies([]);
        } else {
          setMovies(response.data.Search || []);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies(); 
  }, []); 

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); 
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      fetchMovies(); 
    } else {
      fetchMovies(searchQuery); 
    }
  };

  return (
    <Container className="mt-4">
      <h1>Popular Movies</h1>

      <Form onSubmit={handleSearchSubmit}>
        <Form.Group controlId="searchQuery">
          <Form.Control
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Button type="submit" variant="info" className="mt-2">
          Search
        </Button>
      </Form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p className="text-danger">{error}</p>} {}
          <Row className="mt-4">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <Col key={movie.imdbID} md={4} className="mb-4">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={movie.Poster}
                      alt={movie.Title}
                    />
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Button as={Link} to={`/movie/${movie.imdbID}`} variant="info">
                        Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No movies found</p>
            )}
          </Row>
        </>
      )}
    </Container>
  );
}

export default Home;
