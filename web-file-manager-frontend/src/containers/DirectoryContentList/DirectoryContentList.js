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
import { getDirectoryContentItems } from '~/store/directory/selectors';
import { fetchDirectory } from '~/store/directory/actions';
import FileListItem from '~/components/FileListItem';
import DirectoryListItem from '~/components/DirectoryListItem';

@connect(
  state => ({
    directory: state.directory,
    contentItems: getDirectoryContentItems(state)
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
    const { contentItems, classes, directory } = this.props;

    return (
      <React.Fragment>
        <ListSubheader disableSticky className={classes.subheader}>
          Items ({contentItems.length})
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
        <Link href={`/explorer?path=${item.path}`} passHref key={item.id}>
          <DirectoryListItem button directory={item} />
        </Link>
      );
    });
  };

  render() {
    const { directory } = this.props;
    return (
      <List subheader={this.renderSubheader()}>
        {directory.error && (
          <Typography color="error" align="center">
            {directory.error.message}
          </Typography>
        )}
        {this.renderItems()}
      </List>
    );
  }
}

export default DirectoryContentList;
