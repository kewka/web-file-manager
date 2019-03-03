import React, { Component } from 'react';
import Page from '~/components/Page';

export default class IndexPage extends Component {
  get headerProps() {
    return {
      title: 'Index'
    };
  }

  render() {
    return <Page headerProps={this.headerProps}>Index Page</Page>;
  }
}
