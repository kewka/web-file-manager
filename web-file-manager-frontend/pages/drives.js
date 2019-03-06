import React, { Component } from 'react';
import Page from '~/components/Page';
import { fetchDrives } from '~/store/drives/actions';
import DrivesList from '~/containers/DrivesList';

export default class DrivesPage extends Component {
  static async getInitialProps({ store }) {
    const { dispatch } = store;
    await dispatch(fetchDrives());
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
