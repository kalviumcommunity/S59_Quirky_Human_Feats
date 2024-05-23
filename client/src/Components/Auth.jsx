import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Auth = ({ onLogin, onLogout, isLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('login');  
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = action === 'login' ? '/category/login' : '/category/register';
    try {
      const response = await axios.post(`http://localhost:8080${url}`, { username, password });
      if (action === 'login') {
        onLogin(username);
      } else {
        setUsername('');
        setPassword('');
      }
      console.log(response);
      // success 
    } catch (error) {
      setError(error.response.data.error);
      console.error('Error:', error.response.data);
      // error
    }
  };

  const handleLogout = async () => {
    try {
      let response=await axios.post('http://localhost:8080/category/logout');
      onLogout();
      // success 
    } catch (error) {
      console.error('Error:', error.response);
      // error
    }
  };

  return (
    <div className="auth-container">
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>{action === 'login' ? 'Login' : 'Register'}</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">{action === 'login' ? 'Login' : 'Register'}</button>
          </form>
          <button onClick={() => setAction(action === 'login' ? 'register' : 'login')}>
            {action === 'login' ? 'Switch to Register' : 'Switch to Login'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
