import React from 'react';

// Returns a new component that passes down queried socrata data
// from the Chiago business license dataset
//
// queryObject - object that contains our query parameters
// pageSize - objects per page
// offset - how many objects to get (i.e. how many pages in are we, a multiple of pageSize)
//
// I decided to just build queries based on what fields I know the form has
// instead of rolling Socrata access API or using 'soda-js' which has dependencies with security
// vulnerabilities.


function withSocrataQuery(WrappedComponent, queryObjectList, pageSize = 5, offset = 0) {
  function buildQueryString(queryObject, pageSize, offset) {
    let queryString = "$limit=" + pageSize + "&$offset=" + offset + "&$where=";
    let {zipCode, dbaName, legalName} = queryObject;
    const zipFlag = (zipCode !== null && zipCode !== '') ?
      true : false;
    const nameFlag = (dbaName !== null && dbaName !== '') ?
      true : false;
    if(zipFlag) {
      queryString = queryString + `zip_code='${zipCode}'`;
      queryString = nameFlag ? queryString + ' AND (' : queryString;
    }
    if(nameFlag){
      dbaName = dbaName.toUpperCase();
      legalName = legalName.toUpperCase();
      queryString = queryString + `UPPER(doing_business_as_name) like '%${dbaName}%' OR `;
      queryString = queryString + `UPPER(legal_name) like '%${legalName}%'`;
      queryString = zipFlag ? queryString + ')' : queryString;
    }
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
