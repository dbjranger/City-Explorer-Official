import React from 'react';
import Card from 'react-bootstrap/Card';

class Movie extends React.Component {

  render() {
    return (
      <Card border="primary">
        <Card.Body>
          <Card.Img variant="top" src={this.props.image_url} />
          <Card.Header className="text-center">
            <b>{this.props.title}</b>
          </Card.Header>
          <Card.Text><b>Release date:</b> {this.props.releasedOn}</Card.Text>
          {this.props.overview ?
            <Card.Text><b>Description:</b> {this.props.overview}</Card.Text>
            : <Card.Text>No description available</Card.Text>}
        </Card.Body>
      </Card>
    )
  }

}

export default Movie;
