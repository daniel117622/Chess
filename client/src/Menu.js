import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Define async function
    const fetchSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/session', {
          method: 'GET',
          credentials: 'include', // Include cookies in request
        });

        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }

        const data = await response.json();
        if (data.user) {
          setIsSignedIn(true);
          setUsername(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch session:', error);
      }
    };
  
    // Call async function
    fetchSession();
  }, []);  // Empty dependency array means this effect runs once on mount

  return (
    <nav>
      <ul>
        <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
        {!isSignedIn && (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}
        {isSignedIn && (
          <li>
            <Link to="/sign-out">Sign Out</Link>
          </li>
        )}
        <li>
          <Link to="/create-bot">Create Bot</Link>
        </li>
        <li>
          <Link to="/play-against-others">Play Against Others</Link>
        </li>
        {isSignedIn && (
          <li>
            <Link to="/profile">Profile: {username}</Link>
          </li>
        )}
      </ul>

    </nav>
  );
}

export default Menu;
