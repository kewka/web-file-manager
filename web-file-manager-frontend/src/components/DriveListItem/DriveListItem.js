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

  get secondaryText() {
    const { drive } = this.props;
    const { available, total } = drive;
    const totalSize = numeral(total).format('0.0 b');
    const availableSize = numeral(available).format('0.0 b');
    return `${totalSize} (Available: ${availableSize})`;
  }

  render() {
    const { drive, ...restProps } = this.props;
    return (
      <ListItem disabled={!drive.isReady} {...restProps}>
        <ListItemIcon>
          <Icon>storage</Icon>
        </ListItemIcon>
        <ListItemText primary={drive.name} secondary={this.secondaryText} />
        {restProps.href && (
          <ListItemSecondaryAction>
            <Icon>chevron_right</Icon>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}
