import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import WeatherInfo from './WeatherInfo';
import PlaceSelector from './PlaceSelector';

class WeatherPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeName: null,
      weather: null,
      temperature: null,
      loading: false,
    };

    this.places = [
      { name: '札幌', id: 2128295 },
      { name: '東京', id: 1850147 },
      { name: '大阪', id: 1853909 },
      { name: '沖縄', id: 1894616 },
    ];
  }

  selectPlace(index) {
    if (index > 0) {
      const place = this.places[index - 1];
      this.setState({
        placeName: place.name,
        weather: null,
        temperature: null,
        loading: true,
      });
      this.getWeather(place.id);
    }
  }

  getWeather(id) {
    const delay = (mSec) => new Promise((resolve) => setTimeout(resolve, mSec));

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API}&id=${id}&lang=ja&units=metric`
    )
      .then((response) => response.json())
      .then((json) => {
        delay(700).then(() =>
          this.setState({
            weather: json.weather[0].description,
            temperature: json.main.temp,
            loading: false,
          })
        );
      })
      .catch((response) => {
        this.setState({ loading: false });
        console.log('** error **', response);
      });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card style={{ margin: 30, width: 300 }}>
          <CardHeader
            title={<Title place={this.state.placeName} />}
            style={{ marginLeft: 20 }}
          />
          <CardText style={{ position: 'relative' }}>
            <RefreshIndicator
              status={this.state.loading ? 'loading' : 'hide'}
              top={40}
              left={100}
              loadingColor="#f00"
            />
            <WeatherInfo
              weather={this.state.weather}
              temperature={this.state.temperature}
            />
          </CardText>
          <CardActions>
            <PlaceSelector
              places={this.places}
              actionSelect={(index) => this.selectPlace(index)}
            />
          </CardActions>
        </Card>
      </MuiThemeProvider>
    );
  }
}

const Title = ({ place }) => <h1>{place ? place + 'の天気' : '天気予報'}</h1>;

Title.propTypes = {
  place: PropTypes.string,
};

export default WeatherPage;
