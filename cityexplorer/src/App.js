import React from 'react';

//CSS
import './App.css';

//Data Requests
import axios from 'axios';

//Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';

//Components
import Weather from './components/Weather';
import Movies from './components/Movies';

class App extends React.Component {
//Setting up constructors
  constructor(props) {
    super(props);
    this.state = {
      //city and map key:values
      city: '',
      lat: 0,
      lon: 0,
      name: '',
      renderLatLon: false,
      displayError: false,
      errorMessage: '',
      //weather key:values
      weatherData: [],
      displayWeather: false,
      displayWeatherError: false,
      weatherErrMessage: '',
      // movie key:values
      movieData: [],
      displayMovies: false,
      movieErrMessage: '',
    }
  };

  handleChange = (e) => {
    //city is variable is being reassigned to the user's input
    this.setState({ city: e.target.value })
  };

  getCityInfo = async (e) => {
    e.preventDefault();
    try {
      //City Results is assigned to all results based on the user's city input
      let cityResults = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
      
      //Assigning variables to the city result at the zero index.  The first response.
      this.setState({
        lat: cityResults.data[0].lat,
        lon: cityResults.data[0].lon,
        name: cityResults.data[0].display_name,
        map: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${cityResults.data[0].lat},${cityResults.data[0].lon}&zoom=12`,
        renderLatLon: true,
        displayError: false,
      })
      //error handling  
    } catch (error) {
      this.setState({
        renderLatLon: false,
        displayError: true,
        displayWeather: false,
        displayMovies: false,
        errorMessage: `Error: ${error.response.status}, ${error.response.data.error}`
      })
    }

    //The Movie, Weather, and City Methods are called through an onSubmit linked to the Bootstrap Form
    this.getMovieInfo();
    this.getWeatherInfo();
  };


  getWeatherInfo = async () => {
    try {
      //We are creating search parameters within the Weather API url that match the user input for longitude 
      // and latitude based on the city entered
      let weatherResults = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/weather?lat=${this.state.lat}&lon=${this.state.lon}&searchQuery=${this.state.city}`);
      this.setState({
        weatherData: weatherResults.data,
        displayWeather: true,
        displayWeatherError: false,
      })
      //Error Handling  NOTE:  Is error a keyword?  Confused about data associated with error, response, status.
    } catch (error) {
      this.setState({
        displayWeather: false,
        displayWeatherError: true,
        weatherErrMessage: `Error: ${error.response.status}, ${error.response.data}`,
      })
      console.log(error.response);
    }
  }

  //We are creating a search parameter within the Movie API url that matches the user's city input
  getMovieInfo = async () => {
    try {
      let movieResults = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/movies?searchQuery=${this.state.city}`);
      this.setState({
        movieData: movieResults.data,
        displayMovies: true,
        displayMovieError: false,
      });

      console.log(this.state.movieResults);
    } catch (error) {
      console.log(error);
      this.setState({
        displayMovies: false,
        displayMovieError: true,
        movieErrMessage: `${error}`
      })
    }
  }

  render() {

    return (
      <>
        <h1>City Explorer</h1>
        <Container className="cont">
          <Form onSubmit={this.getCityInfo}>
            <Form.Group>
              <Form.Control size="md" className="input" onChange={this.handleChange}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Explore!</Button>
          </Form>
        </Container>
        {this.state.renderLatLon ?
          <ListGroup as="ul" className="text-center">
            <ListGroup.Item as="li" active>{this.state.name}</ListGroup.Item>
            <ListGroup.Item as="li">Latitude: {this.state.lat}; Longitute: {this.state.lon}</ListGroup.Item>
            {this.state.displayWeather ?
              <ListGroup.Item as="li">Weather Forecast by Date
                <Weather
                  weatherData={this.state.weatherData}
                />
              </ListGroup.Item> : ''}
            {this.state.displayWeatherError ? <h3>{this.state.weatherErrMessage}</h3> : ''}
            <ListGroup.Item as="li">
              <Image alt='city' src={this.state.map} rounded />
            </ListGroup.Item>
          </ListGroup> : ''}
        {this.state.displayError ? <h3>{this.state.errorMessage}</h3> : ''}
        {this.state.displayMovies ? <Movies movieData={this.state.movieData} /> : ''}
        {this.state.displayMovieError ? <h3>{this.state.movieErrMessage}</h3> : ''}
      </>
    )
  }
}
export default App;