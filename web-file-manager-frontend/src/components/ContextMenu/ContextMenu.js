import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  ListItemIcon,
  ListItemText,
  Icon,
  Menu,
  MenuItem
} from '@material-ui/core';

export default class ContextMenu extends PureComponent {
  static propTypes = {
    position: PropTypes.shape({
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired
    }),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        title: PropTypes.string,
        onClick: PropTypes.func
      })
    ).isRequired,
    onClose: PropTypes.func
  };

  handleItemClick = itemHandler => event => {
    const { onClose } = this.props;
    itemHandler && itemHandler();
    onClose && onClose(event);
  };

  renderMenuItems = () => {
    const { items } = this.props;
    return items.map((item, i) => (
      <MenuItem onClick={this.handleItemClick(item.onClick)} key={i} dense>
        <ListItemIcon>
          <Icon>{item.icon}</Icon>
        </ListItemIcon>
        <ListItemText>{item.title} </ListItemText>
      </MenuItem>
    ));
  };

  render() {
    const { position, onClose } = this.props;
    return (
      <Menu
        disableAutoFocusItem
        anchorReference="anchorPosition"
        anchorPosition={position}
        open={Boolean(position)}
        onClose={onClose}
        onEscapeKeyDown={onClose}
        onContextMenu={onClose}
      >
        {this.renderMenuItems()}
      </Menu>
    );
  }
}
