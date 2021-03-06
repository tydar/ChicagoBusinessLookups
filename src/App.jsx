import React, { Component } from 'react';
import LookupForm from './components/LookupForm';
import withSocrataQuery from './components/withSocrataQuery';
import SimpleResultsTable from './components/SimpleResultsTable';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import theme from './utils/theme';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  text: {
    alignSelf: 'start',
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      query: [],
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
    const { submitted, query } = this.state;
    const { classes } = this.props;
    let TableComponent = submitted ? withSocrataQuery(SimpleResultsTable, query) : null;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Helmet>
          <title>Chicago Business Lookup</title>
        </Helmet>
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
          <Paper className={classes.root}>
            <div className={classes.container}>
              <Typography variant="subheading" color="inherit" className={classes.text}>
                Quick, dead-simple business lookups using City of Chicago data
              </Typography>
              <Typography variant="body2" color="inherit" className={classes.text}>
                Use this tool to look up the status of business licenses based on their legal or DBA name or zip code. Coming soon: more advanced filtering
                and the ability to lookup by multiple criteria at once.
              </Typography>
              <LookupForm handleSubmit={this.handleSubmit} />
            </div>
            {submitted ? <TableComponent /> : null}
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
