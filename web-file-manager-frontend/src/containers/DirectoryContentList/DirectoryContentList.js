import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  List,
  ListSubheader,
  withStyles,
  Divider,
  Icon,
  Typography
} from '@material-ui/core';
import Link from 'next/link';

import ProgressButton from '~/components/ProgressButton';
import {
  getDirectoriesArray,
  getFilesArray
} from '~/store/directory/selectors';
import { fetchDirectory } from '~/store/directory/actions';
import FileListItem from '~/components/FileListItem';
import DirectoryListItem from '~/components/DirectoryListItem';
import config from '~/config';

@connect(
  state => ({
    directory: state.directory,
    directoriesArray: getDirectoriesArray(state),
    filesArray: getFilesArray(state)
  }),
  {
    fetchDirectory
  }
)
@withStyles(theme => ({
  subheader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}))
class DirectoryContentList extends Component {
  static propTypes = {
    directoryPath: PropTypes.string
  };

  handleRefreshClick = () => {
    const { fetchDirectory, directoryPath } = this.props;
    fetchDirectory(directoryPath);
  };

  renderSubheader = () => {
    const { classes, directory, filesArray, directoriesArray } = this.props;
    const count = directoriesArray.length + filesArray.length;

    return (
      <React.Fragment>
        <ListSubheader disableSticky className={classes.subheader}>
          Items ({count})
          <ProgressButton
            onClick={this.handleRefreshClick}
            isPending={directory.isPending}
          >
            <Icon>refresh</Icon>
          </ProgressButton>
        </ListSubheader>
        <Divider />
      </React.Fragment>
    );
  };

  renderItems = () => {
    const { contentItems } = this.props;

    return contentItems.map(item => {
      const isFile = item.ext !== undefined;
      return isFile ? (
        <FileListItem key={item.id} file={item} />
      ) : (
        <Link
          href={`${config.explorerPath}?path=${item.path}`}
          passHref
          key={item.id}
        >
          <DirectoryListItem button directory={item} />
        </Link>
      );
    });
  };

  renderDirectories = () => {
    const { directoriesArray } = this.props;

    return directoriesArray.map(item => (
      <Link
        href={`${config.explorerPath}?path=${item.path}`}
        passHref
        key={item.id}
      >
        <DirectoryListItem button directory={item} />
      </Link>
    ));
  };

  renderFiles = () => {
    const { filesArray } = this.props;

    return filesArray.map(item => <FileListItem key={item.id} file={item} />);
  };

  render() {
    const { directory } = this.props;

    if (directory.error) {
      return (
        <Typography color="error" align="center">
          {directory.error.message}
        </Typography>
      );
    }

    return (
      <List subheader={this.renderSubheader()}>
        {this.renderDirectories()}
        {this.renderFiles()}
      </List>
    );
  }
}

export default DirectoryContentList;
