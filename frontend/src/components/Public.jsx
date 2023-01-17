import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  return (
    <div className="container">
      <header>
        <h1>Welcome</h1>
      </header>
      <main>
        <p>TechNotes</p>
      </main>
      <footer>
        <nav>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </nav>
      </footer>
    </div>
  );
};

export default Public;
