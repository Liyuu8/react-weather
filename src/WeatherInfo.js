import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from 'material-ui/List';
import WeatherIcon from 'material-ui/svg-icons/image/wb-sunny';
import TemperatureIcon from 'material-ui/svg-icons/editor/show-chart';

const WeatherInfo = ({ weather, temperature }) => (
  <List>
    <ListItem leftIcon={<WeatherIcon />} primaryText={weather} />
    <ListItem
      leftIcon={<TemperatureIcon />}
      primaryText={temperature ? `${temperature} ℃` : ''}
    />
  </List>
);

WeatherInfo.propTypes = {
  weather: PropTypes.string,
  temperature: PropTypes.number,
};

export default WeatherInfo;
