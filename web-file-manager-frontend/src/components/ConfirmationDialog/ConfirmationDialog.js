import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';

const ConfirmationDialog = ({
  onConfirm,
  cancelText,
  confirmText,
  title,
  children,
  ...restProps
}) => {
  return (
    <Dialog disableBackdropClick {...restProps}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={restProps.onClose} autoFocus>
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color="primary">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  onConfirm: PropTypes.func,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
};

ConfirmationDialog.defaultProps = {
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  title: 'Confirm'
};

export default ConfirmationDialog;
