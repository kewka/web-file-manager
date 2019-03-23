import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const HostInfo = ({ info, ...restProps }) => (
  <Typography variant="caption" color="inherit" {...restProps}>
    {info && `${info.name} (${info.platform})`}
  </Typography>
);

HostInfo.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string,
    platform: PropTypes.string,
    time: PropTypes.number
  }).isRequired
};

export default HostInfo;
