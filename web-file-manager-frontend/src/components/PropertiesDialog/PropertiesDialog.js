import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Icon,
  withStyles
} from '@material-ui/core';

import numeral from 'numeral';

import { getDriveType, getDriveIcon } from '~/services/driveType';

@withStyles(theme => ({
  secondaryText: {
    overflowX: 'auto',
    wordBreak: 'break-all'
  }
}))
class PropertiesDialog extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    item: PropTypes.shape({
      path: PropTypes.string,
      name: PropTypes.string,
      size: PropTypes.number
    }).isRequired,
    itemType: PropTypes.oneOf(['file', 'directory', 'drive'])
  };

  get properties() {
    const { item, itemType } = this.props;

    switch (itemType) {
      case 'file':
        return [
          {
            title: 'Name',
            icon: 'label',
            value: item.name
          },
          {
            title: 'Extension',
            icon: 'extension',
            value: item.ext
          },
          {
            title: 'Type',
            icon: 'insert_drive_file',
            value: 'File'
          },
          {
            title: 'Location',
            icon: 'location_on',
            value: item.path
          },
          {
            title: 'Size',
            icon: 'data_usage',
            value: numeral(item.size).format('0.0 b')
          }
        ];
      case 'directory':
        return [
          {
            title: 'Name',
            icon: 'label',
            value: item.name
          },
          {
            title: 'Type',
            icon: 'folder',
            value: 'Directory'
          },
          {
            title: 'Location',
            icon: 'location_on',
            value: item.path
          }
        ];
      case 'drive':
        return [
          {
            title: 'Name',
            icon: 'label',
            value: item.name
          },
          {
            title: 'Volume label',
            icon: 'location_on',
            value: item.label || 'Unknown'
          },
          {
            title: 'Drive type',
            icon: getDriveIcon(item.type),
            value: getDriveType(item.type)
          },
          {
            title: 'Format',
            icon: 'extension',
            value: item.format || 'Unknown'
          },
          {
            title: 'Status',
            icon: item.isReady ? 'check' : 'block',
            value: item.isReady ? 'Ready' : 'Not ready'
          },
          {
            title: 'Total size',
            icon: 'data_usage',
            value: numeral(item.total).format('0.0 b')
          },
          {
            title: 'Available',
            icon: 'cloud_queue',
            value: numeral(item.available).format('0.0 b')
          }
        ];
      default:
        return [];
    }
  }

  renderListItems = () => {
    const { classes } = this.props;
    return this.properties.map((item, i) => (
      <ListItem divider key={i}>
        <Avatar className={classes.avatar}>
          <Icon>{item.icon}</Icon>
        </Avatar>
        <ListItemText
          classes={{ secondary: classes.secondaryText }}
          primary={item.title}
          secondary={item.value}
        />
      </ListItem>
    ));
  };

  render() {
    const { open, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Properties</DialogTitle>
        <DialogContent>
          <List disablePadding>{this.renderListItems()}</List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default PropertiesDialog;
