import React from 'react';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createGenerateClassName
} from '@material-ui/core/styles';
import { createTheme } from '~/services/theme';

const renderer = node => {
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a theme instance.
  const theme = createTheme();

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

  const App = (
    <JssProvider
      registry={sheetsRegistry}
      generateClassName={generateClassName}
    >
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        {node}
      </MuiThemeProvider>
    </JssProvider>
  );
  return {
    html: renderToString(App),
    css: sheetsRegistry.toString()
  };
};

export default renderer;
