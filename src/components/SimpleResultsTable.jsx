import React from 'react';
import { withStyles } from '@material-ui/core/styles'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// This component consumes a JSON Socrata response from the City of Chicago business license database
// and produces a paginated table of license results showing just number, legal name, dba name, and expiration date.

function TableHeadInternal(props){
  const columns = [
    { id: 'dba_name', numeric: false, label: 'Doing Business As'  },
    { id: 'legal_name', numeric: false, label: 'Legal Name' },
    { id: 'license_number', numeric: true, label: 'License Number' },
    { id: 'expiration_date', numeric: false, label: 'Expiration Date' },
  ];
  return (
    <TableHead>
      <TableRow>
        {columns.map(column => {
          return (
            <TableCell key={column.id} numeric={column.numeric}>
              { column.label }
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

function TableBodyInternal(props) {
  const { socrataData } = props;
  if(socrataData == null) {
    return null;
  }
  return (
    <Table>
      <TableHeadInternal />
      <TableBody>
        {socrataData.map(datum => {
          return (
            <TableRow key={datum.id}>
              <TableCell>
                {datum.doing_business_as_name}
              </TableCell>
              <TableCell>
                {datum.legal_name}
              </TableCell>
              <TableCell numeric>
                {datum.license_number}
              </TableCell>
              <TableCell>
                {datum.expiration_date}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

class SimpleResultsTable extends React.Component {
  render() {
    const { socrataData } = this.props;
    return <TableBodyInternal socrataData={socrataData} />;
  }
}

export default SimpleResultsTable;
