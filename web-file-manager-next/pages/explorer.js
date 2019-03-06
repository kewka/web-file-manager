import React, { Component } from 'react';
import Page from '~/components/Page';
import { fetchDirectory } from '~/store/directory/actions';
import DirectoryContentList from '~/containers/DirectoryContentList';

export default class ExplorerPage extends Component {
  static async getInitialProps({ query, store }) {
    const { dispatch } = store;
    const { path: directoryPath } = query;

    try {
      await dispatch(fetchDirectory(directoryPath));
    } catch (e) {
      console.error(e);
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
