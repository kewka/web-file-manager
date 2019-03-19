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

import Router from 'next/router';

import PropertiesDialog from '../PropertiesDialog';
import ConfirmationDialog from '../ConfirmationDialog';

import config from '~/config';

import {
  deleteDirectoryItem,
  renameDirectoryItem
} from '~/store/directory/actions';
import RenameItemDialog from '../RenameItemDialog';
import ContextMenu from '../ContextMenu';

@connect(
  null,
  {
    deleteDirectoryItem,
    renameDirectoryItem
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
    showDelete: false,
    showRename: false
  };

  get menuItems() {
    return [
      {
        icon: 'folder_open',
        title: 'Open',
        onClick: this.handleOpen
      },
      {
        icon: 'edit',
        title: 'Rename',
        onClick: () => this.setState({ showRename: true })
      },
      {
        icon: 'delete',
        title: 'Delete',
        onClick: () => this.setState({ showDelete: true })
      },
      {
        icon: 'info',
        title: 'Properties',
        onClick: () => this.setState({ showProperties: true })
      }
    ];
  }

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

  handleDeleteClose = () => this.setState({ showDelete: false });
  handlePropertiesClose = () => this.setState({ showProperties: false });
  handleRenameClose = () => this.setState({ showRename: false });

  handleDeleteConfirm = () => {
    const { deleteDirectoryItem, directory } = this.props;
    deleteDirectoryItem(directory.path);
    this.handleDeleteClose();
  };

  handleRenameSubmit = ({ name }) => {
    const { directory, renameDirectoryItem } = this.props;
    renameDirectoryItem(directory.path, name);
    this.handleRenameClose();
  };

  render() {
    const {
      directory,
      deleteDirectoryItem,
      renameDirectoryItem,
      ...restProps
    } = this.props;
    const { menuPosition, showProperties, showDelete, showRename } = this.state;

    return (
      <React.Fragment>
        <ListItem onContextMenu={this.handleContextMenu} {...restProps}>
          <ListItemIcon>
            <Icon>folder</Icon>
          </ListItemIcon>
          <ListItemText primary={directory.name} secondary={directory.path} />
          {restProps.href && (
            <ListItemSecondaryAction>
              <IconButton disabled disableRipple disableTouchRipple>
                <Icon>chevron_right</Icon>
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>

        <ContextMenu
          position={menuPosition}
          items={this.menuItems}
          onClose={this.handleMenuClose}
        />

        <PropertiesDialog
          item={directory}
          itemType="directory"
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

        {showRename && (
          <RenameItemDialog
            open={showRename}
            onClose={this.handleRenameClose}
            oldName={directory.name}
            onSubmit={this.handleRenameSubmit}
          />
        )}
      </React.Fragment>
    );
  }
}

export default DirectoryListItem;
