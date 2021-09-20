import React from 'react';
import PropTypes from 'prop-types';
import Search from '../../users/Search';
import classes from './Navbar.module.css';
const Navbar = ({
  icon,
  title,
  searchUsers,
  clearSearch,
  onListingUsers,
  showClear,
  onExistingAlert,
  onRemoveAlert,
  setAlert,
  isEmpty,
}) => {
  return (
    <nav className={`navbar bg-primary ${classes.navbar}`}>
      <div className={classes.cnt_navbar}>
        <h1>
          <i className={icon} />
          {title}
        </h1>
        <Search
          searchUsers={searchUsers}
          clearSearch={clearSearch}
          onListingUsers={onListingUsers}
          showClear={showClear}
          onExistingAlert={onExistingAlert}
          onRemoveAlert={onRemoveAlert}
          setAlert={setAlert}
          isEmpty={isEmpty}
        />
      </div>
    </nav>
  );
};
Navbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fab fa-github',
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
export default Navbar;
