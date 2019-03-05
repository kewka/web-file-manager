import React, { Component } from 'react';
import Page from '~/components/Page';

export default class ExplorerPage extends Component {
  static getInitialProps({ query }) {
    console.log({ query });
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
