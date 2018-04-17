import PropTypes from 'prop-types';
import React from 'react';

class Breadcrumbs extends React.Component {
  render() {
    const { crumbs, id } = this.props;
    return (
      <nav
        aria-label="Breadcrumb"
        className="va-nav-breadcrumbs"
        id={id}>
        <ol className="row va-nav-breadcrumbs-list columns" id={`${id}-list`}>
          {crumbs.map(c => {
            return (
              <li key={c.key}>
                <a
                  aria-current={c.ariaCurrent ? 'page' : null}
                  href={c.link}>
                  {c.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
}

Breadcrumbs.propTypes = {
  // array should contain objects that contain each breadcrumb's
  // key, href, and plain-text label
  crumbs: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string
};

export default Breadcrumbs;
