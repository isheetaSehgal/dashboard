import React from 'react';
import Table from './Table';
import './Dashboard.css';

const Dashboard = () => {
  const dummyData = [
    { Id: 1, Team: 'Team 1', Project: 'Project 1' },
    { Id: 2, Team: 'Team 2', Project: 'Project 2' },
    { Id: 3, Team: 'Team 3', Project: 'Project 3' },
  ];

  const columns = ['Id', 'Team', 'Project'];

  return (
    <div className="dashboard">
      <Table data={dummyData} columns={columns} id="table1" />
    </div>
  );
};

export default Dashboard;
