import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchQuery: ' ',
      renderLatLon: false,
      lat: 0,
      lon: 0,
      display_name: '',
      locationResult: {}
    }
  }

  onChange = (e) => {
    this.setState({searchQuery: e.target.value})
  }

  getCity = async (e) => {
    e.preventDefault();
    let cityResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`);
    console.log(cityResults);
    this.setState({locationResult: cityResults.data[0]});
    this.setState({lat: cityResults.data[0].lat});
    this.setState({lon: cityResults.data[0].lon});
    this.setState({display_name: cityResults.data[0].display_name})
  }

  render() {
    console.log(this.state)
    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.getCityInfo}>
          <input onChange={ (e) => this.setState({searchQuery: e.target.value}) }></input>      
          <button onClick={this.getCity}>Explore!</button>
        </form>
        <h2>{this.state.display_name}</h2>
        <h3>The latitude is: {this.state.lat}</h3>
        <h3>The longitude is: {this.state.lon}</h3>
      </>
    )
  }
}

export default App;
