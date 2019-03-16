import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  ListItemIcon,
  ListItemText,
  Icon,
  Menu,
  MenuItem
} from '@material-ui/core';

export default class DirectoryListItemMenu extends PureComponent {
  static propTypes = {
    menuPosition: PropTypes.shape({
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired
    }),
    onCloseMenu: PropTypes.func,
    onDelete: PropTypes.func,
    onOpen: PropTypes.func,
    onRename: PropTypes.func,
    onProperties: PropTypes.func
  };

  get menuItems() {
    const { onOpen, onDelete, onRename, onProperties } = this.props;
    return [
      {
        icon: 'folder_open',
        title: 'Open',
        onClick: onOpen
      },
      {
        icon: 'edit',
        title: 'Rename',
        onClick: onRename
      },
      {
        icon: 'delete',
        title: 'Delete',
        onClick: onDelete
      },
      {
        icon: 'info',
        title: 'Properties',
        onClick: onProperties
      }
    ];
  }

  handleItemClick = itemHandler => event => {
    const { onCloseMenu } = this.props;
    itemHandler && itemHandler();
    onCloseMenu && onCloseMenu(event);
  };

  renderMenuItems = () => {
    return this.menuItems.map((item, i) => (
      <MenuItem onClick={this.handleItemClick(item.onClick)} key={i} dense>
        <ListItemIcon>
          <Icon>{item.icon}</Icon>
        </ListItemIcon>
        <ListItemText>{item.title} </ListItemText>
      </MenuItem>
    ));
  };
  render() {
    const { menuPosition, onCloseMenu } = this.props;
    return (
      <Menu
        disableAutoFocusItem
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
        open={Boolean(menuPosition)}
        onClose={onCloseMenu}
        onEscapeKeyDown={onCloseMenu}
        onContextMenu={onCloseMenu}
      >
        {this.renderMenuItems()}
      </Menu>
    );
  }
}
