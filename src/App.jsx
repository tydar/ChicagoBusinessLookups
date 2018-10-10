import React, { Component } from 'react';
import LicenseNumberForm from './components/LicenseNumberForm';
import LookupForm from './components/LookupForm';
import withSocrataQuery from './components/withSocrataQuery';
import SimpleResultsTable from './components/SimpleResultsTable';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import theme from './utils/theme';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  grow: {
    flexGrow: 1,
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      query: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(query) {
    this.setState({
      query,
      submitted: true
    });
  }

  render() {
    const { submitted, licenseNumber, query } = this.state;
    const { classes } = this.props;
    let TableComponent = submitted ? withSocrataQuery(SimpleResultsTable, query) : null;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <div className={classes.grow}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="title" color="inherit" className={classes.grow}>
                  Chicago Business Search
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
          <Paper className={classes.container}>
            <LookupForm handleSubmit={this.handleSubmit} />
            {submitted ? <TableComponent /> : null}
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
