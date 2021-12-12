import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './FooterItems.module.css';

const FooterItems = () => (
  <ul className={classes.FooterItems}>
    <NavigationItem link="/about">About</NavigationItem>
    {/* <NavigationItem link="/contact">Contact</NavigationItem> */}

    <a href="https://github.com/ntua/TL20-22" target="_blank" rel="noreferrer">
      Github
    </a>
  </ul>
);

export default FooterItems;
