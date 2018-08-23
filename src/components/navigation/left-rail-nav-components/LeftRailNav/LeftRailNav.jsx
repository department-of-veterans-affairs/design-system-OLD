import React from 'react';
import PropTypes from 'prop-types';

import SubLevel from '../SubLevel/SubLevel';

export default class LeftRailNav extends React.Component {
  getSubLevel(section, i) {
    if (section.links) {
      return (
        <SubLevel
          key={`${section.title} ${i}`}
          title={section.title}
          hidden={this.props.hidden(section.links)}
          isCurrentPage={(link) => this.props.isCurrentPage(link)}>
          {
            section.links.map((link, j) => {
              return (
                <li key={`${link.text} ${j}`}>
                  <a className={this.props.isCurrentPage(link) && 'usa-current'} href={`/${link.href}`}>
                    {link.text}
                  </a>
                </li>
              );
            })
          }
        </SubLevel>
      );
    }

    return (
      <SubLevel
        key={`${section.title} ${i}`}
        title={section.text}
        href={section.href}
        isCurrentPage={(link) => this.props.isCurrentPage(link)}></SubLevel>
    );
  }

  render() {
    return (
      <div>
        <button type="button" className="va-btn-close-icon va-sidebarnav-close">Close this menu</button>

        <div className="left-side-nav-title"><i className={`icon-small fa ${this.props.icon}`}></i><h4>{this.props.title}</h4></div>
        <ul className="usa-sidenav-list">
          {
            this.props.data.map((section, i) => {
              return (
                this.getSubLevel(section, i)
              );
            })
          }
        </ul>
      </div>
    );
  }
}

LeftRailNav.propTypes = {
  stuff: PropTypes.string,
};

LeftRailNav.defaultProps = {};
