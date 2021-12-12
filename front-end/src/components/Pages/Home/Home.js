import React from 'react';
// import backgroundPhoto from '../../Assets/images/poggersmobile.jpg';
import classes from './Home.module.css';

const Home = () => (
  <div className={classes.Home}>
    <h2 className={classes.WelcomeMessage}>
      Welcome to fast charger Homepage!
    </h2>
    <h3> Looking to charge your electric vehicle? </h3>
    <h3> We are the answer! </h3>
    <div>
      We offer:
      <ul>
        <li>
          Great Price
          <p>
            Get the best prices available in the market and have access to
            exlcusive offers.
          </p>
        </li>
        <li>
          Statistics
          <p>
            Get access to all the statistics you will ever need about the
            performance and the condition of your vehicle.
          </p>
        </li>
        <li>
          Easy to use Services
          <p>
            Our website is designed to be light simple, fast and easy to use.
          </p>
        </li>
        <li>
          Database
          <p>
            We have a database that contains data for every transaction that
            happens in our system. Access your data fast and easy!
          </p>
        </li>
        <li>
          Infographics
          <p>Grafikes parastaseis an tis kanoume pote.</p>
        </li>
      </ul>
    </div>
  </div>
);
export default Home;
