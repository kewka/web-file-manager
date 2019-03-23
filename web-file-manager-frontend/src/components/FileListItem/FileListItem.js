import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import numeral from 'numeral';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';

import ContextMenu from '../ContextMenu';
import PropertiesDialog from '../PropertiesDialog';
import RenameItemDialog from '../RenameItemDialog';
import ConfirmationDialog from '../ConfirmationDialog';

import { addDownload } from '~/store/downloads/actions';
import { renameFileItem, deleteFileItem } from '~/store/directory/actions';

import { downloadFile } from '~/services/download';

@connect(
  null,
  {
    addDownload,
    renameFileItem,
    deleteFileItem
  }
)
class FileListItem extends PureComponent {
  static propTypes = {
    file: PropTypes.shape({
      path: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      ext: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired
    }).isRequired
  };

  state = {
    menuPosition: null,
    showProperties: false,
    showRename: false,
    showDelete: false
  };

  get fileSizeText() {
    const { file } = this.props;
    return `Size: ${numeral(file.size).format('0.0 b')}`;
  }

  get menuItems() {
    return [
      {
        icon: 'file_download',
        title: 'Download',
        onClick: this.handleDownload
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

  get listProps() {
    const {
      addDownload,
      renameFileItem,
      deleteFileItem,
      ...listProps
    } = this.props;
    return listProps;
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

  handlePropertiesClose = () => this.setState({ showProperties: false });
  handleRenameClose = () => this.setState({ showRename: false });
  handleDeleteClose = () => this.setState({ showDelete: false });

  handleDeleteConfirm = () => {
    const { file, deleteFileItem } = this.props;
    deleteFileItem(file.path);
    this.handleDeleteClose();
  };

  handleRenameSubmit = ({ name }) => {
    const { file, renameFileItem } = this.props;
    renameFileItem(file.path, name);
    this.handleRenameClose();
  };

  handleDownload = () => {
    const { addDownload, file } = this.props;
    downloadFile(file.path);
    addDownload(file);
  };

  render() {
    const { file } = this.props;
    const { menuPosition, showProperties, showRename, showDelete } = this.state;
    return (
      <React.Fragment>
        <ListItem
          button
          onContextMenu={this.handleContextMenu}
          {...this.listProps}
        >
          <ListItemIcon>
            <Icon>insert_drive_file</Icon>
          </ListItemIcon>
          <ListItemText primary={file.name} secondary={this.fileSizeText} />
          <ListItemSecondaryAction>
            <IconButton onClick={this.handleContextMenu}>
              <Icon>more_vert</Icon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <ContextMenu
          position={menuPosition}
          items={this.menuItems}
          onClose={this.handleMenuClose}
        />

        <PropertiesDialog
          open={showProperties}
          item={file}
          itemType="file"
          onClose={this.handlePropertiesClose}
        />

        {showRename && (
          <RenameItemDialog
            open={showRename}
            onClose={this.handleRenameClose}
            oldName={file.name}
            onSubmit={this.handleRenameSubmit}
          />
        )}

        <ConfirmationDialog
          title="Confirm the deletion"
          confirmText="Delete"
          open={showDelete}
          onConfirm={this.handleDeleteConfirm}
          onClose={this.handleDeleteClose}
        >
          Do you really want to delete the file '{file.name}'?
        </ConfirmationDialog>
      </React.Fragment>
    );
  }
}

export default FileListItem;
