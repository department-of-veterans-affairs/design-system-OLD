import React from 'react';

export default class SubLevel extends React.Component {
  constructor() {
    super();

    this.state = {
      hidden: true,
    };
  }

  getClassNames() {
    if (this.state.hidden) {
      return '';
    }

    return 'usa-current';
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
        className={this.getClassNames()}
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
      <li>
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
