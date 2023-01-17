import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const today = new Intl.DateTimeFormat("en-US", { dateStyle: "short", timeStyle: "short" }).format(new Date());

  return (
    <section>
        <p>{today}</p>
        <h1>Welcome!</h1>
        <nav>
            <Link to="/dash/notes">Notes</Link>
            <Link to="/dash/users">Users</Link>
        </nav>
    </section>
  )
}

export default Welcome