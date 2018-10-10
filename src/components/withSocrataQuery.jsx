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
    if(value != "" && value != null) {
      queryString = queryString + key + "=" + value + "&";
    }
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
        pageSize,
        page: offset / pageSize,
        pageChange: false,
      };
      this.setPage = this.setPage.bind(this);
      this.setPageSize = this.setPageSize.bind(this);
    }

    buildQueryURI(pageSize, page) {
      const offset = page * pageSize;
      let queryString = "";
      Object.keys(queryObject).map(key => {
        const value = queryObject[key];
        if(value != "" && value != null) {
          queryString = queryString + key + "=" + value + "&";
        }
      });

      queryString = queryString + "$limit=" + pageSize + "&";
      queryString = queryString + "$offset=" + offset;

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
      const resourceString = "https://data.cityofchicago.org/resource/xqx5-8hwx.json?$$app_token=7wM9LP6DnrCm11OI0KnTGl75T&$order=:id&";
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

    componentDidUpdate() {
      const { pageSize, page } = this.state;
      if(this.state.pageChange === true) {
        const resourceString = "https://data.cityofchicago.org/resource/xqx5-8hwx.json?$$app_token=7wM9LP6DnrCm11OI0KnTGl75T&$order=:id&";
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
