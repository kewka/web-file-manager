import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  List,
  ListSubheader,
  withStyles,
  Divider,
  IconButton,
  Icon
} from '@material-ui/core';

import DownloadListItem from '~/components/DownloadListItem';

import { clearDownloads } from '~/store/downloads/actions';
import { getDownloadsArray } from '~/store/downloads/selectors';
import ContextMenu from '~/components/ContextMenu';

@connect(
  state => ({
    drives: state.downloads,
    downloadsArray: getDownloadsArray(state)
  }),
  {
    clearDownloads
  }
)
@withStyles(theme => ({
  subheader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}))
class DownloadsList extends Component {
  state = {
    menuPosition: null
  };

  get menuItems() {
    const { clearDownloads } = this.props;
    return [
      {
        title: 'Clear all',
        onClick: clearDownloads
      }
    ];
  }

  handleMenuClose = () => this.setState({ menuPosition: null });
  handleMenuOpen = event =>
    this.setState({
      menuPosition: { left: event.clientX, top: event.clientY }
    });

  renderSubheader = () => {
    const { downloadsArray, classes } = this.props;
    const { menuPosition } = this.state;
    return (
      <React.Fragment>
        <ListSubheader disableSticky className={classes.subheader}>
          Downloads ({downloadsArray.length})
          <IconButton onClick={this.handleMenuOpen}>
            <Icon>more_vert</Icon>
          </IconButton>
        </ListSubheader>
        <Divider />

        <ContextMenu
          position={menuPosition}
          onClose={this.handleMenuClose}
          items={this.menuItems}
        />
      </React.Fragment>
    );
  };

  renderItems = () => {
    const { downloadsArray } = this.props;
    return downloadsArray.map(item => (
      <DownloadListItem key={item.downloadId} download={item} />
    ));
  };

  render() {
    return <List subheader={this.renderSubheader()}>{this.renderItems()}</List>;
  }
}

export default DownloadsList;
