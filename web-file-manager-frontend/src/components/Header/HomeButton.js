import React, { PureComponent } from 'react';
import { IconButton, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';

class HomeButton extends PureComponent {
  render() {
    return (
      <IconButton to="/" component={Link} {...this.props}>
        <Icon>home</Icon>
      </IconButton>
    );
  }
}

export default HomeButton;
