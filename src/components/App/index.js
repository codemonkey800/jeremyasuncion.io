import { AppBar, FlatButton } from 'material-ui';
import { Component } from 'react';
import classNames from 'classnames';

import classes from './style.css';

export default class App extends Component {
  state = {
    red: false,
  };

  render() {
    return (
      <div className={classes.container}>
        <AppBar
          className={classNames(classes.appBar, {
            [classes.red]: this.state.red,
          })}
          title="shit"
        />
        <h1>ay lmao</h1>
        <FlatButton
          onClick={() => this.setState({ red: !this.state.red })}
          label={`Switch to ${this.state.red ? 'primary' : 'red'}`}
        />
      </div>
    );
  }
}
