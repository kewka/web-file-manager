import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import SettingsButton from './SettingsButton';
import HomeButton from './HomeButton';

@withStyles(theme => ({
  homeButton: {
    marginLeft: -12,
    marginRight: 20
  },
  spacer: {
    flex: 1
  }
}))
class Header extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  render() {
    const { title, classes } = this.props;
    return (
      <AppBar>
        <Toolbar>
          <HomeButton color="inherit" className={classes.homeButton} />
          <Typography color="inherit" variant="h6">
            {title}
          </Typography>
          <div className={classes.spacer} />
          <SettingsButton color="inherit" />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
