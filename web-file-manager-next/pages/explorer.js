import React, { Component } from 'react';
import Page from '~/components/Page';
import { fetchDirectory } from '~/store/directory/actions';

export default class ExplorerPage extends Component {
  static async getInitialProps({ query, store }) {
    const { dispatch } = store;
    const { path } = query;

    try {
      await dispatch(fetchDirectory(path));
    } catch (e) {
      console.error(e);
    }

    return {};
  }

  get headerProps() {
    return {
      title: 'Explorer'
    };
  }

  render() {
    return <Page headerProps={this.headerProps}>Explorer Page</Page>;
  }
}
