import React, { Component } from 'react';
import { TextField, InputAdornment, Icon, withStyles } from '@material-ui/core';
import { withRouter } from 'next/router';

@withStyles(theme => ({
  form: {
    display: 'flex',
    flex: 1
  },
  inputRoot: {
    color: theme.palette.primary.contrastText
  },
  inputUnderline: {
    '&:before': {
      borderBottomColor: theme.palette.common.white + '!important'
    },
    '&:after': {
      borderBottomColor: theme.palette.common.white
    }
  }
}))
@withRouter
class PathField extends Component {
  constructor(props) {
    super(props);
    const { router } = this.props;
    const { path: defaultPath } = router.query;

    this.state = {
      path: defaultPath || ''
    };
  }

  componentDidMount() {
    const { router } = this.props;
    router.events.on('routeChangeComplete', this.handleRouteChange);
  }

  componentWillUnmount() {
    const { router } = this.props;
    router.events.off('routeChangeComplete', this.handleRouteChange);
  }

  handleRouteChange = () => {
    const { router } = this.props;
    const { path } = router.query;
    if (router.pathname !== '/explorer') {
      this.setState({ path: '' });
    } else if (path) {
      this.setState({ path });
    }
  };

  handlePathChange = ({ target }) => this.setState({ path: target.value });

  handleSubmit = event => {
    event.preventDefault();
    const { router } = this.props;
    const { path } = this.state;
    router.push(`/explorer?path=${path}`);
  };

  render() {
    const { classes } = this.props;
    const { path } = this.state;
    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <TextField
          placeholder="Path to directory"
          fullWidth={true}
          InputProps={{
            classes: {
              root: classes.inputRoot,
              underline: classes.inputUnderline
            },
            startAdornment: (
              <InputAdornment position="start">
                <Icon>folder_open</Icon>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Icon>keyboard_arrow_right</Icon>
              </InputAdornment>
            )
          }}
          value={path}
          onChange={this.handlePathChange}
        />
      </form>
    );
  }
}

export default PathField;
