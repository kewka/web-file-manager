import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import Header from '~/components/Header';

@withStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: 1
  }
}))
class Page extends Component {
  static propTypes = {
    headerProps: PropTypes.shape(Header.propTypes)
  };

  static defaultProps = {
    headerProps: {}
  };

  render() {
    const { headerProps, classes, children, className } = this.props;
    const contentClass = classNames(classes.content, className);
    return (
      <div className={classes.root}>
        <Header {...headerProps} />
        <main className={contentClass}>{children}</main>
      </div>
    );
  }
}

export default Page;
