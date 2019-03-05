import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
  IconButton,
  Icon
} from '@material-ui/core';
import Helmet from 'react-helmet';
import Link from 'next/link';

@withStyles(theme => ({
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
      <React.Fragment>
        <Helmet title={title} />
        <AppBar position="sticky">
          <Toolbar>
            <Typography color="inherit" variant="h6">
              {title}
            </Typography>
            <div className={classes.spacer} />
            <Typography variant="caption" color="inherit">
              kewka-pc (linux)
            </Typography>
            <IconButton color="inherit">
              <Icon>computer</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default Header;
