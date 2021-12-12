import React, { Component } from 'react';
import axios from 'axios';
// import Input from '../../components/UI/Input/Input';
// import Button from '../../components/UI/Button/Button';
// import classes from './Login.module.css';

class Usecase2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      statiodId: '',
      dateFrom: '',
      dateTo: '',
      stations: '',
      error: '',
      flag: 'false',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    const token = localStorage.getItem('token');
    const { stationId, dateFrom, dateTo, format } = this.state;
    console.log(stationId, dateFrom, dateTo, format);
    axios({
      method: 'get',
      url:
        'http://localhost:8765/evcharge/api/SessionsPerStation/' +
        stationId +
        '/' +
        dateFrom +
        '/' +
        dateTo +
        '?format=' +
        format,
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
        // this.setState({ error: error });
      });
    event.preventDefault();
  };

  render() {
    if (this.state.stations) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="stationId"
              name="stationId"
              placeholder="stationId"
              value={this.state.stationId}
              onChange={this.handleChange}
              required
            />
            <input
              type="dateFrom"
              name="dateFrom"
              placeholder="From this date"
              value={this.state.dateFrom}
              onChange={this.handleChange}
              required
            />
            <input
              type="dateTo"
              name="dateTo"
              placeholder="To this date"
              value={this.state.dateTo}
              onChange={this.handleChange}
              required
            />
            <input
              type="format"
              name="format"
              placeholder="Json Or csv"
              value={this.state.format}
              onChange={this.handleChange}
              required
            />
            <button type="submit">find</button>
          </form>
          <p>{this.state.stations}</p>
        </div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="stationId"
              name="stationId"
              placeholder="stationId"
              value={this.state.stationId}
              onChange={this.handleChange}
              required
            />
            <input
              type="dateFrom"
              name="dateFrom"
              placeholder="From this date"
              value={this.state.dateFrom}
              onChange={this.handleChange}
              required
            />
            <input
              type="dateTo"
              name="dateTo"
              placeholder="To this date"
              value={this.state.dateTo}
              onChange={this.handleChange}
              required
            />
            <input
              type="format"
              name="format"
              placeholder="json Or csv"
              value={this.state.format}
              onChange={this.handleChange}
              required
            />
            <button type="submit">find</button>
          </form>
          {/* <h1>error</h1> */}
          {/* <p>{this.state.error}</p> */}
        </div>
      );
    }
  }
}

//   render() {
//     this.axiosStarter();
//     if (this.state.stations) {
//       return (
//         <>
//           <h1>Station's Information:</h1>
//           <p>{this.state.stations}</p>
//         </>
//       );
//     } else
//       return (
//         <>
//           <div>Select Information</div>
//         </>
//       );
//   }
// }
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
export default Usecase2;
