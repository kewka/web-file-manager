import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import PathField from '~/containers/PathField';
import HostInfo from '../HostInfo';
import HeaderMenu from '../HeaderMenu';

@withStyles(theme => ({
  spacer: {
    flex: 1
  }
}))
@connect(state => ({
  hostInfo: state.host.data
}))
class Header extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  render() {
    const { title, classes, hostInfo } = this.props;
    return (
      <React.Fragment>
        <Helmet title={title} />
        <AppBar position="sticky">
          <Toolbar>
            <Typography color="inherit" variant="h6">
              {title}
            </Typography>
            <div className={classes.spacer} />
            <HostInfo info={hostInfo} />
            <HeaderMenu />
          </Toolbar>
          <Toolbar>
            <PathField />
            <Link href="/drives" passHref>
              <IconButton color="inherit">
                <Icon>storage</Icon>
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default Header;
