import React, { Component } from 'react';
import axios from 'axios';

class Usecase1 extends Component {
  state = {
    stations: '',
    error: '',
  };

  axiosStarter = () => {
    const token = localStorage.getItem('token');
    axios({
      method: 'get',
      url: 'http://localhost:8765/evcharge/api/Usecase2',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'XOBSERVATORY-AUTH': token,
      },
    })
      .then(response => {
        this.setState({ stations: JSON.stringify(response.data) });
      })
      .catch(error => {
        console.log(error);
        // console.log(error.response.data);
        // this.setState({ error: error.response.data });
      });
  };
  render() {
    this.axiosStarter();
    if (this.state.stations) {
      return (
        <>
          <h1>Station's Information:</h1>
          <p>{this.state.stations}</p>
        </>
      );
    } else return <div>Waiting for Station's statistics</div>;
  }
}
// const Usecase2 = ({ station }) => {
//   console.log(station);
//   station = { gay: 'facts' };
//   if (station) {
//     return (
//       <>
//         <h1>Station's Information</h1>
//         <p>{station}</p>
//       </>
//     );
//   } else return <div>An error has occured</div>;
// };
export default Usecase1;

// import React from 'react';

// const Usecase1 = props => <div>Edw einai usecase1 page</div>;
// export default Usecase1;
