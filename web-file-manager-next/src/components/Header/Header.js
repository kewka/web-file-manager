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
      <React.Fragment>
        <Helmet title={title} />
        <AppBar position="sticky">
          <Toolbar>
            <Link href="/" passHref>
              <IconButton color="inherit" className={classes.homeButton}>
                <Icon>home</Icon>
              </IconButton>
            </Link>
            <Typography color="inherit" variant="h6">
              {title}
            </Typography>
            <div className={classes.spacer} />
            <IconButton color="inherit">
              <Icon>settings</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default Header;
