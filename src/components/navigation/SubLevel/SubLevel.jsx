import React from 'react';
import PropTypes from 'prop-types';

export default class SubLevel extends React.Component {
  constructor() {
    super();

    this.state = {
      hidden: true,
    };
  }

  getLinkClassNames() {
    if (this.state.hidden) {
      return '';
    }

    return 'usa-current';
  }

  getLiClassNames() {
    if (this.state.hidden) {
      return '';
    }

    return 'active-menu';
  }

  getLinkTag() {
    if (this.props.href) {
      return (
        <a href={this.props.href}>
          {this.props.title}
        </a>
      );
    }

    return (
      <a
        className={this.getLinkClassNames()}
        role="button"
        tabIndex={0}
        onClick={() => this.toggleMenu()}>
        {this.props.title}
      </a>
    );
  }

  toggleMenu() {
    this.setState({
      hidden: !this.state.hidden,
    });
  }

  render() {
    return (
      <li className={this.getLiClassNames()}>
        {this.getLinkTag()}

        {
          !this.state.hidden && <ul className="usa-sidenav-sub_list">
            {this.props.children && this.props.children}
          </ul>
        }
      </li>
    );
  }
}

SubLevel.propTypes = {
  stuff: PropTypes.string,
};

SubLevel.defaultProps = {};
