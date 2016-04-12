import React from 'react';
import { Link } from 'react-router';

export default function Nav() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li>
          <Link to="/woops">A route that doesn't exist on server and client</Link>
        </li>
        <li>
          <Link to="/google">This should 404 client side, but server side route.js config works and redirects to google.</Link>
        </li>
      </ul>
    </div>
  );
}

