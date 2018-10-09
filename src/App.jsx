import React, { Component } from 'react';
import logo from './logo.svg';
import LicenseNumberForm from './components/LicenseNumberForm';
import withSocrataQuery from './components/withSocrataQuery';
import SimpleResultsTable from './components/SimpleResultsTable';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(licenseNumber) {
    this.setState({
      licenseNumber,
      submitted: true
    });
  }

  render() {
    const { submitted, licenseNumber } = this.state;
    const queryObject = {"license_number": licenseNumber};
    let TableComponent = submitted ? withSocrataQuery(SimpleResultsTable, queryObject) : null;
    return (
      <div className="App">
        <header className="App-header">
          <LicenseNumberForm handleSubmit={this.handleSubmit} />
          {submitted ? <TableComponent /> : null}
        </header>
      </div>
    );
  }
}

export default App;
