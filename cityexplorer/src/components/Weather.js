import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import WeatherDay from './WeatherDay';

class Weather extends React.Component {

  render() {
    let weatherArrToRender = this.props.weatherData.map((weatherByDate, index) => (
      <WeatherDay
        key={index}
        description={weatherByDate.description}
        date={weatherByDate.date}
      />)
    )
    return (
      <CardColumns>
        {weatherArrToRender}
      </CardColumns>
    )
  }

}

export default Weather;
