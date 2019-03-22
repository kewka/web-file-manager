import React, { Component } from 'react';
import Page from '~/components/Page';
import DownloadsList from '~/containers/DownloadsList';

export default class DrivesPage extends Component {
  get headerProps() {
    return {
      title: 'Downloads'
    };
  }

  render() {
    return (
      <Page headerProps={this.headerProps}>
        <DownloadsList />
      </Page>
    );
  }
}
