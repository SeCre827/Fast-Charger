import React from 'react';
import logoImage from '../../Assets/images/logo.png';
import classes from './Logo.module.css';

const Logo = props => (
  <div className={classes.Logo}>
    <img src={logoImage} alt="MyLogo" />
  </div>
);

export default Logo;
