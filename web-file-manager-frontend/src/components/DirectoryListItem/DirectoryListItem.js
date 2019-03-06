import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  ListItemSecondaryAction
} from '@material-ui/core';

export default class DirectoryListItem extends PureComponent {
  static propTypes = {
    directory: PropTypes.shape({
      path: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    const { directory, ...restProps } = this.props;
    return (
      <ListItem {...restProps}>
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
    );
  }
}
