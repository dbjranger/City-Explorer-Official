import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  // constructor(props){
  //   this.state = {
  //     city: ' ',
  //     renderLatLon: false,
  //     lat: 0,
  //     lon: 0,
  //   }
  // }

  // handleChange = (e) => {
  //   this.setState({city: e.target.value})
  // }

  // getCity = (e) => {
  //   e.preventDefault();

  //   let cityResults = await axios.get('https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.city.state}&format=json');
  //   return cityResults;
  // }

  render() {
    return (
      <>
        <h1>Hello World</h1>
        <form onSubmit={this.getCityInfo}>
          <input onChange={this.handleChange}/>
          <button>Get City Information</button>
        </form>
      </>
    )
  }
}

export default App;
