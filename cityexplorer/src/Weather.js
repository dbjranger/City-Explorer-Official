
import React from 'react';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {

  render() {
    return (
      <Card border="primary" className="text-center">
        <Card.Body>
          <Card.Header>{this.props.date}</Card.Header>
          <Card.Text>{this.props.description}</Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default Weather;
