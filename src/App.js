import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = { weather: {} };

  async componentDidMount() {
    //first situation (if success) //step 3
    const success = async ({ coords }) => {
      const { latitude, longitude } = coords;

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=94048389ab1c2aeec5dd9f7a5c2fbdeb`
      );
      this.setState({ weather: data });
    };
    //second situation (if fail) //step 2
    const fail = (fail) => {
      return;
    };
    //get user geolocation //step 1
    navigator.geolocation.getCurrentPosition(success, fail);
  }

  render() {
    const { list, city } = this.state.weather;
    // const { name, country } = this.state.weather.city;

    console.log(this.state.weather);
    console.log(this.state.weather.city);

    if (!list) {
      return <h1>Loading......</h1>;
    } // why this one needed, because it need to return in the render method if the weather data has not yet arrived, otherwise it will get error

    return (
      //----- call the data you want and use //step 4
      <>
        {list.map((item, index) => {
          if (index % 4 !== 0) {
            return;
          } //----- if it is not a point in the array, skip it // step 5

          return (
            <div class="small-container">
              <div class="forecastItem">
                <div class="time">
                  <p>{new Date(item.dt * 1000).toLocaleString()}</p>
                </div>
                <div class="temp">
                  <p>{Math.round(item.main.temp - 273.15)}&deg;C</p>
                </div>
                <div class="status">
                  <p>{item.weather[0].main}</p>
                </div>

                {/* <div class="icon"><img src="https://openweathermap.org/img/wn/${
       item.weather[0].icon
     }.png" alt="${item.weather[0].main}"></div> */}
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

export default App;
