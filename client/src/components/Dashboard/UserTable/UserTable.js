import React from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import './UserTable.css';
import { deleteUser } from '../../../actions/leaderboard';
import { connect } from 'react-redux';

const UserTable = props => {
  const deleteColumn = props.admin
    ? {
        Header: 'Delete',
        accessor: 'id',
        Cell: user => (
          <i
            className="fas fa-trash-alt"
            onClick={() => {
              props.onDeleteUser(props.requestKey, user.original.id);
            }}
          />
        ),
        width: 100
      }
    : {
      width: 0
    };
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
    },
    { ...deleteColumn }
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

const mapDispatchToProps = dispatch => {
  return {
    onDeleteUser: (key, userID) => {
      dispatch(deleteUser(key, userID));
    }
  };
};

export default connect(null, mapDispatchToProps)(UserTable);
