import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core';

export default class FileListItem extends PureComponent {
  static propTypes = {
    file: PropTypes.shape({
      path: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      ext: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired
    }).isRequired
  };

  get fileSizeText() {
    const { file } = this.props;
    return `Size: ${numeral(file.size).format('0.0 b')}`;
  }

  render() {
    const { file, ...restProps } = this.props;
    return (
      <ListItem {...restProps}>
        <ListItemIcon>
          <Icon>insert_drive_file</Icon>
        </ListItemIcon>
        <ListItemText primary={file.name} secondary={this.fileSizeText} />
      </ListItem>
    );
  }
}
