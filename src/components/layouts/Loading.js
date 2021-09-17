import React from 'react';
import classes from './Loading.module.css';
class Loading extends React.Component {
  render() {
    return (
      <div className={classes.loader}>
        <span className={`${classes.span} ${classes.top_half}`}>
          {this.props.loading}
        </span>
        <span className={`${classes.span} ${classes.bottom_half}`}>
          {this.props.loading}
        </span>
      </div>
    );
  }
}
export default Loading;
