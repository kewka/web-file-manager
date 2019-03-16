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
            title: 'Type',
            icon: 'insert_drive_file',
            value: 'File'
          },
          {
            title: 'Location',
            icon: 'location_on',
            value: item.path
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
