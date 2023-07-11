import React, { useState } from 'react';
import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Include cookies in request
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }

      const data = await response.json();
      if (data.success) {
        window.location.reload();
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Sign In</button>
    </form>
  );
}

export default SignIn;
