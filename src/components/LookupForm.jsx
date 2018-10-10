import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
  }
};

function LookupFormInternal(props) {
  const { handleSubmit, handleChange, zipCode, businessName, classes } = props;
  return (
    <form autoComplete="off" noValidate className={classes.form}>
      <TextField
        id='zipCode'
        label='Zip Code'
        value={zipCode}
        onChange={handleChange}
        type='number'
        margin='normal'
        variant='filled'
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id='businessName'
        label='Business Name'
        value={businessName}
        onChange={handleChange}
        margin='normal'
        variant='filled'
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant='contained' color='primary' onClick={handleSubmit}>
        Search
      </Button>
    </form>
  );
}

class LookupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessName: "",
      zipCode: "",
      FormStyled: withStyles(styles)(LookupFormInternal),
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitLocal = this.submitLocal.bind(this);
  }

  handleChange(event) {
    const key = event.target.id;
    const value = event.target.value;
    this.setState({
      [key]: value,
    });
  }

  submitLocal(event) {
    const { handleSubmit } = this.props;
    const { businessName, zipCode } = this.state;
    event.preventDefault();
    handleSubmit([
      { key: 'legal_name', value: businessName, operatorArity: 'infixWord', operator: 'like', type: 'text'  },
      { key: 'doing_business_as_name', value: businessName, operatorArity: 'infixWord', operator: 'like', type: 'text'  },
      { key: 'zip_code', value: zipCode, operatorArity: 'infix', operator: '=', type: 'number' },
    ]);
  }

  render() {
    const { businessName, zipCode, FormStyled } = this.state;
    return (
      <FormStyled
        handleSubmit={this.submitLocal}
        handleChange={this.handleChange}
        zipCode={zipCode}
        businessName={businessName}
      />
    );
  }
}

export default LookupForm;
