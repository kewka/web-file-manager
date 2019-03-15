import React, { PureComponent } from 'react';
import { InputAdornment, Icon, withStyles } from '@material-ui/core';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import Autocomplete from '~/components/Autocomplete';
import { searchDirectory } from '~/store/directory/actions';
import config from '~/config';

@withStyles(theme => ({
  form: {
    display: 'flex',
    flex: 1
  },
  inputRoot: {
    color: theme.palette.primary.contrastText + '!important',
    caretColor: theme.palette.primary.contrastText
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
@connect(
  state => ({
    searchResults: state.directory.search
  }),
  dispatch => {
    return {
      debounceSearchDirectory: debounce(query => {
        dispatch(searchDirectory(query));
      }, 400)
    };
  }
)
class PathField extends PureComponent {
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
    if (router.pathname !== config.explorerPath) {
      this.setState({ path: '' });
    } else if (path) {
      this.setState({ path });
    }
  };

  handlePathSelect = path => {
    this.setState({ path });
    this.updateExplorer(path);
  };

  handlePathInput = path => {
    const { debounceSearchDirectory } = this.props;
    this.setState({ path });
    debounceSearchDirectory(path);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.updateExplorer(this.state.path);
  };

  updateExplorer = path => {
    const { router } = this.props;
    router.push(`${config.explorerPath}?path=${path}`);
  };

  get suggestions() {
    const { searchResults } = this.props;
    return searchResults.map(item => ({
      label: item.path,
      value: item.path
    }));
  }

  render() {
    const { classes } = this.props;
    const { path } = this.state;
    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <Autocomplete
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
            ),
            placeholder: 'Path to directory'
          }}
          suggestions={this.suggestions}
          initialInputValue={path}
          selectedItem={path}
          onSelect={this.handlePathSelect}
          onInputValueChange={this.handlePathInput}
        />
      </form>
    );
  }
}

export default PathField;
