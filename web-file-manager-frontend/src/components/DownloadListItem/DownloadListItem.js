import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';

import { removeDownload } from '~/store/downloads/actions';
import ContextMenu from '../ContextMenu';
import PropertiesDialog from '../PropertiesDialog';

import Router from 'next/router';
import config from '~/config';

@connect(
  null,
  {
    removeDownload
  }
)
class DownloadListItem extends PureComponent {
  static propTypes = {
    download: PropTypes.shape({
      path: PropTypes.string.isRequired,
      downloadId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  };

  state = {
    menuPosition: null,
    showProperties: false
  };

  get listItemProps() {
    const { download, removeDownload, ...listItemProps } = this.props;
    return listItemProps;
  }

  get menuItems() {
    return [
      {
        icon: 'delete',
        title: 'Remove',
        onClick: this.handleRemove
      },
      {
        icon: 'remove_red_eye',
        title: 'Reveal in Explorer',
        onClick: this.handleReveal
      },
      {
        icon: 'info',
        title: 'Properties',
        onClick: () => this.setState({ showProperties: true })
      }
    ];
  }

  handleRemove = () => {
    const { download, removeDownload } = this.props;
    removeDownload(download.downloadId);
  };

  handleContextMenu = event => {
    event.preventDefault();

    const menuPosition = {
      left: event.clientX,
      top: event.clientY
    };

    this.setState({ menuPosition });
  };

  handleMenuClose = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ menuPosition: null });
  };

  handlePropertiesClose = () => this.setState({ showProperties: false });

  handleReveal = () => {
    const { download } = this.props;
    const { path: fullPath, type, name } = download;
    const path =
      type === 'directory'
        ? fullPath
        : fullPath.substring(0, fullPath.length - name.length);

    Router.push(`${config.explorerPath}?path=${path}`);
  };

  render() {
    const { download } = this.props;
    const { menuPosition, showProperties } = this.state;

    return (
      <React.Fragment>
        <ListItem
          button
          onContextMenu={this.handleContextMenu}
          {...this.listItemProps}
        >
          <ListItemIcon>
            <Icon>
              {download.type === 'file' ? 'insert_drive_file' : 'folder'}
            </Icon>
          </ListItemIcon>
          <ListItemText primary={download.name} secondary={download.path} />
          <ListItemSecondaryAction>
            <IconButton onClick={this.handleRemove}>
              <Icon color="error">close</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <ContextMenu
          position={menuPosition}
          onClose={this.handleMenuClose}
          items={this.menuItems}
        />

        <PropertiesDialog
          item={download}
          itemType={download.type}
          open={showProperties}
          onClose={this.handlePropertiesClose}
        />
      </React.Fragment>
    );
  }
}

export default DownloadListItem;
