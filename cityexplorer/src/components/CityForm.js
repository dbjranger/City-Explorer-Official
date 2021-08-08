
import React from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import Weather from './Weather.js';
import Movie from './Movie.js';

class CityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      lat: 0,
      lon: 0,
      name: '',
      renderLatLon: false,
      displayError: false,
      errorMessage: '',
      weatherData: [],
      displayWeather: false,
      displayWeatherError: false,
      weatherErrMessage: '',
      movies: [],
      showMovies: false,
      cityInput: ''
    }
  };

  handleChange = (e) => {
    this.setState({ city: e.target.value })
  };

  getCityInfo = async (e) => {
    e.preventDefault();
    try {
      let cityResults = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
      this.setState({
        lat: cityResults.data[0].lat,
        lon: cityResults.data[0].lon,
        name: cityResults.data[0].display_name,
        renderLatLon: true,
        displayError: false,
      })
    } catch (error) {
      this.setState({
        renderLatLon: false,
        displayError: true,
        displayWeather: false,
        errorMessage: `Error: ${error.response.status}, ${error.response.data.error}`
      });
      console.log("Get city info" + this.state.errorMessage)
    }
    if (!this.state.errorMessage) {
      this.getWeatherinfo();
      this.getMovieInfo();
    }
  };

  getMovieInfo = async () => { 
    try {
      let results = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/movies?search=${this.state.cityInput}`);
      this.setState({
        movies: results.data,
      });
    } catch (error) {
      this.setState({
        renderError: true,
        errorMessage: `ERROR: ${error}`
      })
    }
  };

  getWeatherinfo = async () => {
    try {
      let weatherResults = await axios.get(`http://localhost:3001/weather?lat=${this.state.lat}&lon=${this.state.lon}`);
      console.log(`Weather Res: ${weatherResults.data}`)

      this.setState({
        weatherData: weatherResults.data,
        displayWeather: true,
        displayWeatherError: false,
      })
    } catch (error) {
      this.setState({
        displayWeather: false,
        displayWeatherError: true,
        weatherErrMessage: `Error: ${error.response.status}, ${error.response.data}`,

      })
      console.log(error.response);
    }
  }

  render() {
    
    let movieArrToRender = this.state.movies.map((movie, index) => (
      <Movie
        key={index}
        overview = {movie.overview}
        average_votes = {movie.average_votes}
        total_votes = {movie.total_votes}
        popularity = {movie.popularity}
        released_on = {movie.released_on}
      />)
    )

    let weatherArrToRender = this.state.weatherData.map((weatherByDate, index) => (
      <Weather
        key={index}
        description={weatherByDate.description}
        date={weatherByDate.date}
      />)
    )

    return (
      <>
        <h1>City Explorer</h1>
        <Container className="cont">
          <Form onSubmit={this.getCityInfo}>
            <Form.Group>
              <Form.Control size="md" className="input" onChange={this.handleChange}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Explore!</Button>
            <br></br>
          </Form>
        </Container>
        {this.state.renderLatLon ?
          <ListGroup as="ul" className="text-center">
            <br></br>
            <ListGroup.Item as="li" active>{this.state.name}</ListGroup.Item>
            <ListGroup.Item as="li">Latitude: {Math.floor(this.state.lat)}; Longitute: {Math.floor(this.state.lon)}</ListGroup.Item>
            {this.state.displayWeather ?
              <ListGroup.Item className="weather-title" as="li"><h3>Weather Forecast by Date</h3>
                <div>
                  <CardColumns className="one">
                    {/* We replaced the render methods with components that we import */}
                    {weatherArrToRender}
                    {movieArrToRender}
                    {/* <Weather /> */}
                    {/* <Movie /> */}
                  </CardColumns>
                </div>  
              </ListGroup.Item> : ''}
            {this.state.displayWeatherError ? <h3>{this.state.weatherErrMessage}</h3> : ''}
            <ListGroup.Item as="li"><Image alt='city' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12`} rounded /></ListGroup.Item>
          </ListGroup> : ''}
        {this.state.displayError ? <h3>{this.state.errorMessage}</h3> : ''}
      </>
    )
  }
}

export default CityForm;