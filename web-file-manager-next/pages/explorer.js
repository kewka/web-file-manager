import React, { Component } from 'react';
import Page from '~/components/Page';

export default class ExplorerPage extends Component {
  get headerProps() {
    return {
      title: 'Explorer'
    };
  }
  render() {
    return <Page headerProps={this.headerProps}>Explorer Page</Page>;
  }
}
