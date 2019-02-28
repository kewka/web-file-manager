import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { After } from '@jaredpalmer/after';
import { createGenerateClassName, MuiThemeProvider } from '@material-ui/core';
import JssProvider from 'react-jss/lib/JssProvider';

import routes from './routes';
import { createTheme } from './services/theme';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.theme = createTheme();
    this.generateClassName = createGenerateClassName();
  }

  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { data } = this.props;
    return (
      <BrowserRouter>
        <JssProvider generateClassName={this.generateClassName}>
          <MuiThemeProvider theme={this.theme}>
            <After data={data} routes={routes} />
          </MuiThemeProvider>
        </JssProvider>
      </BrowserRouter>
    );
  }
}
