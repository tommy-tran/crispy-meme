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
        accessor: '_id',
        Cell: user => (
          <i
            className="fas fa-trash-alt"
            onClick={() => {
              props.onDeleteUser(props.requestKey, user.original._id);
            }}
          />
        ),
        width: 70,
        sortable: false
      }
    : {
        width: 0
      };
  const columns = [
    {
      Header: 'Rank',
      accessor: 'rank',
      minWidth: 50
    },
    {
      Header: 'Name',
      accessor: 'username',
      minWidth: 70
    },
    {
      Header: 'Score',
      accessor: 'score',
      minWidth: 70
    },
    {
      Header: 'Date',
      accessor: 'date',
      minWidth: 60
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
