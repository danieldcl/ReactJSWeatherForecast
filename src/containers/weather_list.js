import React from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends React.Component{
  renderWeather(data){
    const temps = _.map((data.list.map(weather => weather.main.temp)), t => t*9/5-459.67);
    const humidities = data.list.map(weather => weather.main.humidity);
    const pressures = data.list.map(weather => weather.main.pressure);
    const { lon, lat } = data.city.coord;

    return (
      <tr key={data.city.id}>
        <td><GoogleMap lon={lon} lat={lat} /></td>
        <td><Chart data={temps} color={"red"} unit={"F"}/></td>
        <td><Chart data={pressures} color={"black"} unit={"hPa"}/></td>
        <td><Chart data={humidities} color={"green"} unit={"%"}/></td>
      </tr>
    );
  }

  render(){
    return (
      <table class="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (F)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }){
  return { weather: weather };
}

export default connect(mapStateToProps)(WeatherList);
