import React from "react";
import "./App.css";

import SearchBar from "./components/search-bar";
import CurrentWeather from "./components/current-weather";
import Forecast from "./components/forecast";

import * as Api from "./api/weatherAPI";

const Celsius = "Celsius";
class App extends React.Component {
   state = {
      location: "Delhi",
      hourlyForecast:[],
      metric: Celsius,
      dailyForecast: [],
      current: "",
    };

  componentDidMount(){
    this.updateTemperature();
  }
  

  handleLocationChange=(location)=> {
    this.setState({ location });
  };

  updateTemperature= async()=> {
    const weatherRes = await Api.getWeatherBasedOnLocation(this.state.location);
    const forecastRes = await Api.getForecast(
      weatherRes.coord.lat,
      weatherRes.coord.lon
    );

    this.setState({
      current: forecastRes.current,
      metric: Celsius,
      hourlyForecast: forecastRes.hourly,
      dailyForecast:forecastRes.daily
    });
  };

  render() {
    const location = this.state.location;
    const hourlyForecast = this.state.hourlyForecast;
    const current = this.state.current;
    const dailyForecast=this.state.dailyForecast;

    return (
      <div className="App">
        <header className="App-header">
          <SearchBar
            searchValue={location}
            onSearchChange={this.handleLocationChange}
            onFormSubmit={this.updateTemperature}
          />

          {current && <CurrentWeather current={current} />}
          {hourlyForecast.length > 0 && (<Forecast forecast={hourlyForecast} dailyForecast={dailyForecast} />)}
        </header>
      </div>
    );
  }
}

export default App;
