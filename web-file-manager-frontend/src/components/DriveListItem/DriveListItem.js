import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import numeral from 'numeral';

import PropertiesDialog from '../PropertiesDialog';
import ContextMenu from '../ContextMenu';

import { getDriveIcon } from '~/services/driveType';

export default class DriveListItem extends PureComponent {
  static propTypes = {
    drive: PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      name: PropTypes.string.isRequired,
      type: PropTypes.number.isRequired,
      format: PropTypes.string,
      isReady: PropTypes.bool.isRequired,
      available: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired
    }).isRequired
  };

  state = {
    menuPosition: null,
    showProperties: false
  };

  get driveIcon() {
    const { drive } = this.props;
    return getDriveIcon(drive.type);
  }

  get secondaryText() {
    const { drive } = this.props;
    const { available, total } = drive;
    const totalSize = numeral(total).format('0.0 b');
    const availableSize = numeral(available).format('0.0 b');
    return `${totalSize} (Available: ${availableSize})`;
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
    const { drive, ...restProps } = this.props;
    const { showProperties, menuPosition } = this.state;
    return (
      <React.Fragment>
        <ListItem
          onContextMenu={this.handleContextMenu}
          disabled={!drive.isReady}
          {...restProps}
        >
          <ListItemIcon>
            <Icon>{this.driveIcon}</Icon>
          </ListItemIcon>
          <ListItemText primary={drive.name} secondary={this.secondaryText} />
          {restProps.href && (
            <ListItemSecondaryAction>
              <Icon>chevron_right</Icon>
            </ListItemSecondaryAction>
          )}
        </ListItem>

        <ContextMenu
          position={menuPosition}
          items={this.menuItems}
          onClose={this.handleMenuClose}
        />

        <PropertiesDialog
          item={drive}
          itemType="drive"
          open={showProperties}
          onClose={this.handlePropertiesClose}
        />
      </React.Fragment>
    );
  }
}
