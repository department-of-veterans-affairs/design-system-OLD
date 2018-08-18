import React from 'react';
import PropTypes from 'prop-types';

export default class LeftRailNav extends React.Component {
  render() {
    return (
      <div className="usa-grid">
        <nav className="usa-width-one-fourth va-sidebarnav" id="va-detailpage-sidebar">
          <div>
            <button type="button" className="va-btn-close-icon va-sidebarnav-close">Close this menu</button>

            <h4>{this.props.title}</h4>
            <ul className="usa-sidenav-list">
              {this.props.children}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

LeftRailNav.propTypes = {
  stuff: PropTypes.string,
};

LeftRailNav.defaultProps = {};
