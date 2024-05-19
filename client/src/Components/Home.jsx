import React, { useState } from 'react';
import './Home.css';
import CategoryList from './CategoryList';

const Home = () => {
  const [showCategories, setShowCategories] = useState(false);

  const handleClick = () => {
    setShowCategories(true);
  };

  return (
    <div className="home-page">
      <div className="centered-content">
        <h1>Welcome to Quirky Human Feats!</h1>
        <button className="enter-button" onClick={handleClick}>
          Enter The World Of Absurdity
        </button>
      </div>
      {showCategories && <CategoryList />}
    </div>
  );
};

export default Home;
