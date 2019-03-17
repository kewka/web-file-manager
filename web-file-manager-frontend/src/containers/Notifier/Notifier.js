import { Component } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { hideNotification } from '~/store/app/actions';

// https://codesandbox.io/s/github/iamhosseindhv/notistack/tree/master/examples/redux-example

@connect(
  state => ({
    notifications: state.app.notifications
  }),
  {
    hideNotification
  }
)
@withSnackbar
class Notifier extends Component {
  displayed = [];

  componentDidMount() {
    const { isServer } = this.props;

    if (isServer) {
      this.forceUpdate();
    }
  }

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    const { notifications: currentSnacks } = this.props;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i += 1) {
      if (notExists) continue;
      notExists =
        notExists ||
        !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
    }

    return notExists;
  }

  componentDidUpdate() {
    const { notifications = [] } = this.props;
    notifications.forEach(notification => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(notification.key)) return;
      // Display snackbar using notistack
      this.props.enqueueSnackbar(notification.message, notification.options);
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(notification.key);
      // Dispatch action to remove snackbar from redux store
      this.props.hideNotification(notification.key);
    });
  }

  render() {
    return null;
  }
}

export default Notifier;
