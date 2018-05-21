import React from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';

const UserTable = props => {
  const data = [
    {
      name: 'Tanner Linsley',
      age: 26,
      friend: {
        name: 'Jason Maurer',
        age: 23
      }
    }
  ];

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

    // {
    //   Header: 'Username',
    //   accessor: 'username' // String-based value accessors!
    // },
    // {
    //   Header: 'Date',
    //   accessor: 'date',
    //   Cell: props => <span className="number">{props.value}</span> // Custom cell components!
    // },
    // {
    //   id: 'friendName', // Required because our accessor is not a string
    //   Header: 'Friend Name',
    //   accessor: d => d.friend.name // Custom value accessors!
    // },
    // {
    //   Header: props => <span>Friend Age</span>, // Custom header components!
    //   accessor: 'friend.age'
    // }
  ];

  console.log(props.leaderboard);

  return <ReactTable data={props.leaderboardData} columns={columns} />;
};

export default UserTable;
