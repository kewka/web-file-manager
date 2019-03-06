import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IconButton, CircularProgress } from '@material-ui/core';

export default class ProgressButton extends PureComponent {
  static propTypes = {
    isPending: PropTypes.bool
  };

  render() {
    const { isPending, children, ...restProps } = this.props;
    return (
      <IconButton {...restProps} disabled={isPending}>
        {isPending ? (
          <CircularProgress color="secondary" size={20} />
        ) : (
          children
        )}
      </IconButton>
    );
  }
}
