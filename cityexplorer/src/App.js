import "./App.css";
import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: " ",
      renderLatLon: false,
      lat: 0,
      lon: 0,
      display_name: "",
      locationResult: {},
      renderError: false,
      errorMessage: ''
    };
  }

  onChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  getCity = async (e) => {
    e.preventDefault();

    try {
      let cityResults =
        await axios.get(`https://us1.locationiq.com/v1/search.php?
      key=${process.env.REACT_APP_LOCATIONIQ_KEY}&
      q=${this.state.searchQuery}&
      format=json`);
      console.log(cityResults);

      this.setState({
        locationResult: cityResults.data[0],
        lat: cityResults.data[0].lat,
        lon: cityResults.data[0].lon,
        display_name: cityResults.data[0].display_name,
      });
    } catch (error) {
      console.log('The error is: ', error.response);
      this.setState({
        renderError: true,
        errorMessage: `Error: ${error.response.status}, ${error.response.data.error}`,
      })
      
    }
  };

  render() {
    console.log(this.state);
    return (
      <>
        <h1>City Explorer</h1>
        {/* Bootstrap Form and Button not working */}
        <div>
          <Form onSubmit={this.getCityInfo}>
            <input
              onChange={(e) => this.setState({ searchQuery: e.target.value })}
            ></input>
            <Button onClick={this.getCity} variant="primary">
              Explore!
            </Button>
          </Form>
        </div>

        {this.state.display_name ? <h3>{this.state.display_name}</h3> : ''}
        {this.state.lat ? <h3>The latitude is: {this.state.lat}</h3> : ''}
        {this.state.lon ? <h3>The longitude is: {this.state.lon}</h3> : ''}
        {this.state.renderError ? <h3>{this.state.errorMessage}</h3> : ''}
        <br></br>
        {this.state.display_name ? 
          <img src={`https://maps.locationiq.com/v3/staticmap?
          key=${process.env.REACT_APP_LOCATIONIQ_KEY}&
          center=${this.state.lat},${this.state.lon}
          &zoom=10`} alt={this.state.display_name}/> : ''}
      </>
    );
  }
}

export default App;
