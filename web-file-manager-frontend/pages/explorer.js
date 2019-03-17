import React, { Component } from 'react';

import Page from '~/components/Page';
import DirectoryContentList from '~/containers/DirectoryContentList';

import { fetchDirectory, resetDirectoryData } from '~/store/directory/actions';

export default class ExplorerPage extends Component {
  static async getInitialProps({ query, store }) {
    const { dispatch } = store;
    const { path: directoryPath } = query;

    try {
      await dispatch(fetchDirectory(directoryPath));
    } catch {
      dispatch(resetDirectoryData());
    }

    return { directoryPath };
  }

  get headerProps() {
    return {
      title: 'Explorer'
    };
  }

  render() {
    const { directoryPath } = this.props;

    return (
      <Page headerProps={this.headerProps}>
        <DirectoryContentList directoryPath={directoryPath} />
      </Page>
    );
  }
}
