import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {};

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
    console.log(this.state);
    const { list } = this.state.weather;

    return (
      // <h1>hi</h1>
      <>
        {list.map((item) => {
          return `<p>${new Date(item.dt * 1000).toLocaleString()}</p>`;
        })}
      </>
    );
  }
}

export default App;
