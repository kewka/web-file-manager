import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default class IndexPage extends Component {
  render() {
    return (
      <div>
        <AppBar>
          <Toolbar>
            <Typography color="inherit" variant="h6">
              Index Page
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
