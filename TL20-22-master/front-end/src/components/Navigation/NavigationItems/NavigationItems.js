import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
import Logo from '../../Logo/Logo';

const NavigationItems = () => {
  let token = false;
  if (localStorage.getItem('token')) token = true;
  return (
    <ul className={classes.NavigationItems}>
      <Logo />
      <NavigationItem link="/">Home</NavigationItem>
      <NavigationItem link="/usecase1" auth={!token}>
        Station's Statistics
      </NavigationItem>
      <NavigationItem link="/usecase2" auth={!token}>
        Station's Information
      </NavigationItem>
      {/* <NavigationItem>
      <Link to="/endpoints">Endpoints</Link>
    </NavigationItem> */}
      {/* <NavigationItem link="/endpoints" auth={!token}>
        Endpoints
      </NavigationItem> */}
      {/* <NavigationItem link="/">Customer</NavigationItem> */}
      <NavigationItem link="/login" auth={token}>
        Login
      </NavigationItem>
      <NavigationItem link="/logout" auth={!token}>
        Logout
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;
