import React from 'react';
import { Link } from 'react-router-dom';
export default class Block extends React.Component {
    render() {
        return (
        <Link to={this.props.url || '/'} className={`block ${this.props.className || ''}`}>
          {this.props.children}
        </Link>
      );
    }
}
Block.propTypes = {
    children: React.PropTypes.oneOfType(
      [React.PropTypes.object,
        React.PropTypes.array]),
    className: React.PropTypes.string,
    url: React.PropTypes.string,
};
