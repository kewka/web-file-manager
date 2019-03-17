import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { SnackbarProvider } from 'notistack';
import withRedux from 'next-redux-wrapper';

import Notifier from '~/containers/Notifier';

import getPageContext from '~/helpers/getPageContext';
import configureStore from '~/store';
import * as hostActions from '~/store/host/actions';

import '~/static/index.css';

@withRedux(configureStore)
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { store } = ctx;

    await store.dispatch(hostActions.fetchHost());

    let pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps, isServer: ctx.isServer };
  }

  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store, isServer } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              <CssBaseline />
              <SnackbarProvider>
                <React.Fragment>
                  <Notifier isServer={isServer} />
                  <Component pageContext={this.pageContext} {...pageProps} />
                </React.Fragment>
              </SnackbarProvider>
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      </Container>
    );
  }
}

export default MyApp;
