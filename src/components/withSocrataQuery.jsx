import React from 'react';

// Returns a new component that passes down queried socrata data
// from the Chiago business license dataset
//
// queryObject - object that describes the query string
// pageSize - objects per page
// offset - how many objects to get (i.e. how many pages in are we, a multiple of pageSize)

// queryObject structure --
// {
//  key: name of socrata field
//  operatorArity: infix or function
//  operator: =, like, etc
//  type: text, number, etc
//  value: value of key
// }
//
//
// BIG OL' TODO: create a plan to develop some utility functions to build query strings more robustly &
// with more seperation of concerns.

function withSocrataQuery(WrappedComponent, queryObjectList, pageSize = 5, offset = 0) {
  function buildQueryString(queryObjectList, pageSize, offset) {
    let queryString = "$limit=" + pageSize + "&$offset=" + offset + "&$where=";
    let criteriaCount = 0;
    queryObjectList.map((query, index) => {
      if(query.value !== null && query.value !== ''){
        if(index !== 0 && criteriaCount > 0) {
          queryString = queryString + ' OR ';
        }
        let value = query.value;
        let key = query.key;
        if(query.type === 'text') {
          key = 'UPPER(' + query.key + ')';
          value = "'%" + query.value.toUpperCase() + "%'";
        } else {
          value = "'" + query.value + "'";
        }
        if(query.operatorArity === 'infixWord') {
          queryString = queryString + key + ' ' + query.operator + ' ' + value;
        } else if(query.operatorArity === 'function') {
          queryString = queryString + query.operator + ' ' + key + ', ' + value + ')';
        } else if(query.operatorArity === 'infix') {
          queryString = queryString + key + query.operator + value;
        }
        criteriaCount++;
      } 
    });
    return queryString;
  }

  let queryString = buildQueryString(queryObjectList, pageSize, offset);
  const queryURI = encodeURI(queryString);

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        socrataData: null,
        error: null,
        pageSize,
        page: offset / pageSize,
        pageChange: false,
      };
      this.setPage = this.setPage.bind(this);
      this.setPageSize = this.setPageSize.bind(this);
    }

    buildQueryURI(pageSize, page) {
      const offset = page * pageSize;
      const queryString = buildQueryString(queryObjectList, pageSize, offset);

      const queryURI = encodeURI(queryString);

      return queryURI;
    }

    setPage(page) {
      this.setState({
        page,
        pageChange: true,
      });
    }

    setPageSize(pageSize) {
      this.setState({
        pageSize,
        pageChange: true,
      });
    }

    componentDidMount() {
      const resourceString = "https://data.cityofchicago.org/resource/xqx5-8hwx.json?$$app_token=7wM9LP6DnrCm11OI0KnTGl75T&$order=expiration_date DESC&";
      console.log(resourceString + queryURI);
      fetch(resourceString + queryURI) //this is the queryURI we built at the beginning of the function
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

    componentDidUpdate() {
      const { pageSize, page } = this.state;
      if(this.state.pageChange === true) {
        const resourceString = "https://data.cityofchicago.org/resource/xqx5-8hwx.json?$$app_token=7wM9LP6DnrCm11OI0KnTGl75T&$order=expiration_date DESC&";
        fetch(resourceString + this.buildQueryURI(pageSize, page))
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
        this.setState({
          pageChange: false,
        });
      }
    }

    render() {
      const { socrataData, error, page, pageSize } = this.state;
      return <WrappedComponent 
        socrataData={socrataData} 
        error={error} 
        setPage={this.setPage}
        setPageSize={this.setPageSize}
        page={page}
        pageSize={pageSize}
      />
    }
  }
}

export default withSocrataQuery;
