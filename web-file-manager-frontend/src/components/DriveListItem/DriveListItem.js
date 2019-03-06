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
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      available: PropTypes.number.isRequired
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
      <ListItem {...restProps}>
        <ListItemIcon>
          <Icon>storage</Icon>
        </ListItemIcon>
        <ListItemText primary={drive.label} secondary={this.secondaryText} />
        {restProps.href && (
          <ListItemSecondaryAction>
            <Icon>chevron_right</Icon>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}
