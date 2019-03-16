import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  ListItemSecondaryAction
} from '@material-ui/core';

import Router from 'next/router';

import DirectoryListItemMenu from './DirectoryListItemMenu';
import PropertiesDialog from '../PropertiesDialog';
import ConfirmationDialog from '../ConfirmationDialog';

import config from '~/config';

import { deleteDirectoryItem } from '~/store/directory/actions';

@connect(
  null,
  {
    deleteDirectoryItem
  }
)
class DirectoryListItem extends PureComponent {
  static propTypes = {
    directory: PropTypes.shape({
      path: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  };

  state = {
    menuPosition: null,
    showProperties: false,
    showDelete: false
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

  handleOpen = () => {
    const { directory } = this.props;
    Router.push(`${config.explorerPath}?path=${directory.path}`);
  };

  handleDeleteOpen = () => this.setState({ showDelete: true });
  handleDeleteClose = () => this.setState({ showDelete: false });
  handlePropertiesOpen = () => this.setState({ showProperties: true });
  handlePropertiesClose = () => this.setState({ showProperties: false });

  handleDeleteConfirm = () => {
    const { deleteDirectoryItem, directory } = this.props;
    deleteDirectoryItem(directory.path);
    this.setState({ showDelete: false });
  };

  render() {
    const { directory, ...restProps } = this.props;
    const { menuPosition, showProperties, showDelete } = this.state;
    return (
      <React.Fragment>
        <ListItem onContextMenu={this.handleContextMenu} {...restProps}>
          <ListItemIcon>
            <Icon>folder</Icon>
          </ListItemIcon>
          <ListItemText primary={directory.name} secondary={directory.path} />
          {restProps.href && (
            <ListItemSecondaryAction>
              <Icon>chevron_right</Icon>
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <DirectoryListItemMenu
          menuPosition={menuPosition}
          onCloseMenu={this.handleMenuClose}
          onOpen={this.handleOpen}
          onProperties={this.handlePropertiesOpen}
          onDelete={this.handleDeleteOpen}
        />
        <PropertiesDialog
          item={directory}
          isFile={false}
          open={showProperties}
          onClose={this.handlePropertiesClose}
        />
        <ConfirmationDialog
          title="Confirm the deletion"
          confirmText="Delete"
          open={showDelete}
          onConfirm={this.handleDeleteConfirm}
          onClose={this.handleDeleteClose}
        >
          Do you really want to delete the directory '{directory.name}'?
        </ConfirmationDialog>
      </React.Fragment>
    );
  }
}

export default DirectoryListItem;
