import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import FormTextField from '../FormTextField';

import * as validate from '~/utils/validate';

@connect((state, props) => {
  return {
    initialValues: {
      name: props.oldName
    }
  };
})
@reduxForm({
  form: 'rename-item',
  destroyOnUnmount: true,
  enableReinitialize: true
})
class RenameItemDialog extends Component {
  static propTypes = {
    oldName: PropTypes.string
  };

  render() {
    const { handleSubmit, open, onClose, invalid } = this.props;
    return (
      <Dialog
        fullWidth
        maxWidth="sm"
        disableBackdropClick
        open={open}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Rename item</DialogTitle>
          <DialogContent>
            <Field
              name="name"
              component={FormTextField}
              fullWidth
              autoFocus
              placeholder="Enter a new name"
              label="Name"
              validate={[validate.required]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Close</Button>
            <Button disabled={invalid} type="submit" color="primary">
              Rename
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default RenameItemDialog;
