import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  List,
  ListSubheader,
  withStyles,
  Divider,
  Icon
} from '@material-ui/core';
import Link from 'next/link';
import DriveListItem from '~/components/DriveListItem';
import ProgressButton from '~/components/ProgressButton';

import { getDrivesArray } from '~/store/drives/selectors';
import { fetchDrives } from '~/store/drives/actions';
import config from '~/config';

@connect(
  state => ({
    drives: state.drives,
    drivesArray: getDrivesArray(state)
  }),
  {
    fetchDrives
  }
)
@withStyles(theme => ({
  subheader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}))
class DrivesList extends Component {
  renderSubheader = () => {
    const { drivesArray, classes, fetchDrives, drives } = this.props;

    return (
      <React.Fragment>
        <ListSubheader disableSticky className={classes.subheader}>
          Drives ({drivesArray.length})
          <ProgressButton onClick={fetchDrives} isPending={drives.isPending}>
            <Icon>refresh</Icon>
          </ProgressButton>
        </ListSubheader>
        <Divider />
      </React.Fragment>
    );
  };

  renderItems = () => {
    const { drivesArray } = this.props;
    return drivesArray.map(item => (
      <Link
        href={`${config.explorerPath}?path=${item.label}`}
        passHref
        key={item.id}
      >
        <DriveListItem button drive={item} />
      </Link>
    ));
  };

  render() {
    return <List subheader={this.renderSubheader()}>{this.renderItems()}</List>;
  }
}

export default DrivesList;
