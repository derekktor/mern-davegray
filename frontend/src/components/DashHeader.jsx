import React from "react";
import { Link } from "react-router-dom";

const DashHeader = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/dash/notes">Notes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dash/users">Users</Link>
            </li>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashHeader;
