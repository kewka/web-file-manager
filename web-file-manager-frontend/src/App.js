import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { After } from '@jaredpalmer/after';
import { createGenerateClassName, MuiThemeProvider } from '@material-ui/core';
import JssProvider from 'react-jss/lib/JssProvider';
import { Provider } from 'react-redux';

import routes from './routes';
import { createTheme } from './services/theme';
import configureStore from './store';

const store = configureStore(window.__PRELOADED_STATE__);

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
        <Provider store={store}>
          <JssProvider generateClassName={this.generateClassName}>
            <MuiThemeProvider theme={this.theme}>
              <After data={data} routes={routes} />
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      </BrowserRouter>
    );
  }
}
