import React from 'react';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import Movie from './Movie.js';

class Movies extends React.Component {

  render() {
    let movieArrToRender = this.props.movieData.map((movie, index) => (
      <Movie
        key={index}
        title={movie.title}
        image_url={movie.image_url}
        overview={movie.overview}
        releasedOn={movie.releasedOn}
      />
    ))
    
    return (
      <Container>
        {movieArrToRender.length > 0
          ? <CardColumns>
            {movieArrToRender}
          </CardColumns>
          : <h3>No movies were found matching your search input</h3>}
      </Container>
    )
  }
}

export default Movies;