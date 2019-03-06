import React from 'react';
import Page from '~/components/Page';
import { withStyles, Typography } from '@material-ui/core';

@withStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))
class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  get headerProps() {
    return {
      title: 'Error'
    };
  }

  render() {
    const { classes, statusCode } = this.props;
    return (
      <Page className={classes.root} headerProps={this.headerProps}>
        <Typography variant="h5" color="error">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </Typography>
      </Page>
    );
  }
}

export default Error;
