import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import WeatherDay from './WeatherDay';

class Weather extends React.Component {

  render() {
    let weatherArrToRender = this.props.weatherData.map((dailyWeather, index) => (
      <WeatherDay
        key={index}
        description={dailyWeather.description}
        date={dailyWeather.date}
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
