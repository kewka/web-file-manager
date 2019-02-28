import React, { PureComponent } from 'react';
import { IconButton, Icon } from '@material-ui/core';

class SettingsButton extends PureComponent {
  render() {
    return (
      <IconButton {...this.props}>
        <Icon>settings</Icon>
      </IconButton>
    );
  }
}

export default SettingsButton;
