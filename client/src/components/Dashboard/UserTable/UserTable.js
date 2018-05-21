import React from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import './UserTable.css';

const UserTable = props => {
  const columns = [
    {
      Header: 'Rank',
      accessor: 'rank'
    },
    {
      Header: 'Username',
      accessor: 'username' // String-based value accessors!
    },
    {
      Header: 'Score',
      accessor: 'score'
    },
    {
      Header: 'Date',
      accessor: 'date'
    }
  ];

  return (
    <ReactTable
      data={props.leaderboardData}
      columns={columns}
      defaultPageSize={5}
      resizable={false}
      className="UserTable"
    />
  );
};

export default UserTable;
