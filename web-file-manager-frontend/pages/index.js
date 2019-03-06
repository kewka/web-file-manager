import React, { Component } from 'react';
import Page from '~/components/Page';
import { withStyles, Typography } from '@material-ui/core';

@withStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))
class IndexPage extends Component {
  get headerProps() {
    return {
      title: 'File Manager'
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Page className={classes.root} headerProps={this.headerProps}>
        <Typography variant="h5">Web File Manager</Typography>
        <Typography variant="caption">version: 0.1.0</Typography>
      </Page>
    );
  }
}

export default IndexPage;
