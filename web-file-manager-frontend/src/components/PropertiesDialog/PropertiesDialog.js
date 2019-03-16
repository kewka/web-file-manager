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
    isFile: PropTypes.bool,
    item: PropTypes.shape({
      path: PropTypes.string,
      name: PropTypes.string,
      size: PropTypes.number
    }).isRequired
  };

  get properties() {
    const { item, isFile } = this.props;
    return [
      {
        title: 'Name',
        icon: 'label',
        value: item.name
      },
      {
        title: 'Type',
        icon: isFile ? 'insert_drive_file' : 'folder',
        value: isFile ? 'File' : 'Directory'
      },
      {
        title: 'Location',
        icon: 'location_on',
        value: item.path
      }
    ];
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
