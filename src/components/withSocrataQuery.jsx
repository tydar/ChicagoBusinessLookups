import React from 'react';

// Returns a new component that passes down queried socrata data
// from the Chiago business license dataset
//
// queryObject - flat key-value object that describes the query string
// pageSize - objects per page
// offset - how many objects to get (i.e. how many pages in are we, a multiple of pageSize)

function withSocrataQuery(WrappedComponent, queryObject, pageSize = 5, offset = 0) {
  let queryString = "";
  Object.keys(queryObject).map(key => {
    const value = queryObject[key];
    queryString = queryString + key + "=" + value + "&";
  });

  queryString = queryString + "$limit=" + pageSize + "&";
  queryString = queryString + "$offset=" + offset;

  const queryURI = encodeURI(queryString);

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        socrataData: null,
        error: null,
      };
    }

    componentDidMount(){
      const resourceString = "https://data.cityofchicago.org/resource/xqx5-8hwx.json?$$app_token=7wM9LP6DnrCm11OI0KnTGl75T&$order=:id&";
      console.log(resourceString + queryURI);
      fetch(resourceString + queryURI)
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
