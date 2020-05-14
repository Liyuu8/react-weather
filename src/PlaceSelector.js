import React from 'react';
import PropTypes from 'prop-types';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const PlaceSelector = ({ places, actionSelect }) => (
  <DropDownMenu value={-1} onChange={(event, index) => actionSelect(index)}>
    <MenuItem value={-1} primaryText="場所を選択" />
    {places.map((place, index) => (
      <MenuItem key={index} value={index} primaryText={place.name} />
    ))}
  </DropDownMenu>
);

PlaceSelector.propTypes = {
  places: PropTypes.array,
  actionSelect: PropTypes.func,
};

export default PlaceSelector;
