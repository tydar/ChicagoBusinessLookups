import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
});

function LicenseNumberFormPresentation(props) {
  const { handleSubmit, handleChange, licenseNumber, classes } = props;
  return (
    <form autoComplete="off" noValidate className={classes.form}>
      <TextField
        id="license-number"
        label="License Number"
        value={licenseNumber}
        onChange={handleChange}
        type="number"
        margin="normal"
        variant="filled"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Search
      </Button>
    </form>
  );
}

class LicenseNumberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      licenseNumber: '',
      LNFPStyled: withStyles(styles)(LicenseNumberFormPresentation),
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitLocal = this.submitLocal.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      licenseNumber: event.target.value,
    });
  }

  submitLocal(event) {
    const { handleSubmit } = this.props;
    event.preventDefault();
    if(this.state.licenseNumber != '') {
        handleSubmit(this.state.licenseNumber);
    }
  }

  render() {
    const { licenseNumber, LNFPStyled } = this.state;
    return <LNFPStyled 
      handleSubmit={this.submitLocal}
      handleChange={this.handleChange} 
      licenseNumber={licenseNumber} 
    />
  }
}

export default LicenseNumberForm;
