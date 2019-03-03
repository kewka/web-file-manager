import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { fetchDrives } from '~/store/drives/actions';

export default class IndexPage extends Component {
  static async getInitialProps({ store }) {
    const { dispatch } = store;
    await dispatch(fetchDrives());
    return {};
  }
  render() {
    return <Button>Example button</Button>;
  }
}
