import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, IconButton, Icon, withStyles } from '@material-ui/core';
import { fetchHost } from '~/store/host/actions';
import ProgressButton from '~/components/ProgressButton';

@connect(
  state => ({
    host: state.host,
    hostData: state.host.data
  }),
  {
    fetchHost
  }
)
@withStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  }
}))
class Host extends Component {
  componentDidMount() {
    const { fetchHost, hostData } = this.props;
    !hostData && fetchHost();
  }

  render() {
    const { hostData, host, classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="caption" color="inherit">
          {hostData && `${hostData.hostname} (${hostData.platform})`}
        </Typography>
        <ProgressButton isPending={host.isPending} color="inherit">
          <Icon>computer</Icon>
        </ProgressButton>
      </div>
    );
  }
}

export default Host;
