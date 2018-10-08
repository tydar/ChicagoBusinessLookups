import React from 'react';

// Returns a new component that passes down queried socrata data
// from the Chiago business license dataset

function withSocrataQuery(WrappedComponent, queryString) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        socrataData: null,
        error: null,
      };
    }

    componentDidMount(){
      const resourceString = "https://data.cityofchicago.org/resource/xqx5-8hwx.json?$limit=1000&$$app_token=7wM9LP6DnrCm11OI0KnTGl75T&"
      fetch(resourceString + queryString)
        .then(res => res.json())
        .then( (result) => {
          this.setState({
            socrataData: result,
          });
        }, (error) => {
          this.setState({
            error
          });
        });
    }

    render() {
      const { socrataData, error } = this.state;
      return <WrappedComponent socrataData={socrataData} error={error} />
    }
  }
}

export default withSocrataQuery;
