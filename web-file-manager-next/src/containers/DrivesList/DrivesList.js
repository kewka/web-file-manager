import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDrivesArray } from '~/store/drives/selectors';
import { List, ListSubheader } from '@material-ui/core';
import DriveListItem from '~/components/DriveListItem';
import Link from 'next/link';

@connect(state => ({
  drives: state.drives,
  drivesArray: getDrivesArray(state)
}))
class DrivesList extends Component {
  renderSubheader = () => {
    const { drivesArray } = this.props;

    return <ListSubheader>Drives ({drivesArray.length})</ListSubheader>;
  };

  renderItems = () => {
    const { drivesArray } = this.props;
    return drivesArray.map(item => (
      <Link href={`/explorer?path=${item.path}`} passHref key={item.id}>
        <DriveListItem button drive={item} />
      </Link>
    ));
  };

  render() {
    return <List subheader={this.renderSubheader()}>{this.renderItems()}</List>;
  }
}

export default DrivesList;
