import React, { Component } from 'react';
import Page from '~/components/Page';
import DrivesList from '~/containers/DrivesList';

import { fetchDrives } from '~/store/drives/actions';

export default class DrivesPage extends Component {
  static async getInitialProps({ store }) {
    const { dispatch } = store;

    try {
      await dispatch(fetchDrives());
    } catch {}

    return {};
  }

  get headerProps() {
    return {
      title: 'Drives'
    };
  }

  render() {
    return (
      <Page headerProps={this.headerProps}>
        <DrivesList />
      </Page>
    );
  }
}
