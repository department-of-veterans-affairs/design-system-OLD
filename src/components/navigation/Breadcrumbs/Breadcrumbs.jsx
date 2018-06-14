import PropTypes from 'prop-types';
import React from 'react';
import _debounce from '../../../helpers/debounce';
import classNames from 'classnames';
import uniqueId from 'lodash.uniqueid';

class Breadcrumbs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileShow: false,
    };
  }

  componentDidMount() {
    const mobileWidth = this.props.mobileWidth;

    this.toggleDisplay(mobileWidth);
    window.addEventListener('resize', this.debouncedToggleDisplay);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedToggleDisplay);
  }

  debouncedToggleDisplay = _debounce(() => {
    const mobileWidth = this.props.mobileWidth;

    this.toggleDisplay(mobileWidth);
  }, 500);

  /**
   * Provide a means to add overriding classes
   */
  classNames() {
    const customClass = this.props.customClasses;

    return classNames(
      'va-nav-breadcrumbs',
      customClass
    );
  }

  /**
   * Manage state to show all breadcrumb links or
   * just the mobile "Back by one" link
   */
  toggleDisplay = breakpoint => {
    if (window.innerWidth <= breakpoint) {
      this.setState({ mobileShow: true });
    } else {
      this.setState({ mobileShow: false });
    }
  }

  /**
   * Build the breadcrumb links. Check the array length
   * and add an `aria-current` attribute to the last link.
   */
  renderBreadcrumbLinks = () => {
    return React.Children.map(this.props.children, (child, i) => {
      if (i === this.props.children.length - 1) {
        return (
          <li>{React.cloneElement(child, {
            'aria-current': 'page',
          })}</li>
        );
      }

      return <li>{child}</li>;
    });
  }

  /**
   * The second to last link being sliced from the crumbs array
   * prop to create the "Back by one" mobile breadcrumb link
   */
  renderMobileLink = () => {
    return React.Children.map(this.props.children, (child, i) => {
      if (i === this.props.children.length - 2) {
        return (
          <li>{React.cloneElement(child, {
            'aria-label': `Previous page: ${child.props.children}`,
            className: 'va-nav-breadcrumbs-list__mobile-link',
          })}</li>
        );
      }

      return null;
    });
  }

  render() {
    const {
      id,
      listId
    } = this.props;
    const breadcrumbId = id || uniqueId('va-breadcrumbs-');
    const breadcrumbListId = listId || uniqueId('va-breadcrumbs-list-');
    const mobileShow = this.state.mobileShow;
    const shownList = mobileShow
      ? (
        <ul
          className="row va-nav-breadcrumbs-list columns"
          id={`${breadcrumbListId}-clone`}>
          {this.renderMobileLink()}
        </ul>
      ) : (
        <ul
          className="row va-nav-breadcrumbs-list columns"
          id={breadcrumbListId}>
          {this.renderBreadcrumbLinks()}
        </ul>
      );

    return (
      <nav
        aria-label={this.props.ariaLabel}
        aria-live="polite"
        className={this.classNames()}
        data-mobile-width={this.props.mobileWidth}
        id={breadcrumbId}>
        { shownList }
      </nav>
    );
  }
}

Breadcrumbs.defaultProps = {
  ariaLabel: 'Breadcrumb',
  mobileWidth: 481,
};

Breadcrumbs.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  customClasses: PropTypes.string,
  id: PropTypes.string,
  listId: PropTypes.string,
  mobileWidth: PropTypes.number.isRequired,
};

export default Breadcrumbs;
