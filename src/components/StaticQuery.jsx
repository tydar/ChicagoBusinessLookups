import React from 'react';
import withSocrataQuery from './withSocrataQuery'; 

const queryString = "license_number=2041741";

function StaticQuery(props) {
  const { socrataData, errors } = props;
  return <p>{ socrataData ? socrataData[0].legal_name : null }</p>
}

export default withSocrataQuery(StaticQuery, queryString);
