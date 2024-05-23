import React, { useState } from 'react';
import Auth from './Components/Auth';
import CategoryList from './Components/CategoryList';
import './App.css'; 
import axios from 'axios';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/category/logout');
      setUsername('');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="app">
      {isLoggedIn ? (
        <div>
          <CategoryList />
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
