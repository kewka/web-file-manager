import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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

export default class FileListItem extends PureComponent {
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
    showProperties: false
  };

  get fileSizeText() {
    const { file } = this.props;
    return `Size: ${numeral(file.size).format('0.0 b')}`;
  }

  get menuItems() {
    return [
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

  handlePropertiesClose = () => this.setState({ showProperties: false });

  render() {
    const { file, ...restProps } = this.props;
    const { menuPosition, showProperties } = this.state;
    return (
      <React.Fragment>
        <ListItem button onContextMenu={this.handleContextMenu} {...restProps}>
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
      </React.Fragment>
    );
  }
}
