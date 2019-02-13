// ----
// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import BlogList from './blogs/BlogList';


// ----
// Dashboard functional Component
const Dashboard = () => {
  return (
    <div className="dashboard container">

      <BlogList />

      <div id="createNewBlog" className="fixed-action-btn">
        <Link 
          to="/blogs/new" 
          className="waves-effect waves-light btn-floating btn-large pulse red">
          <i className="material-icons">add</i>
        </Link>
      </div>

    </div>
  );
};


export default Dashboard;
