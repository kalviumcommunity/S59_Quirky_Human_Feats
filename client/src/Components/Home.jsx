import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Home.css';
import CategoryList from './CategoryList';
import QuirksPage from './QuirksPage';

const Home = () => {
  return (
    <Router>
      <div className="home-page">
        <div className="top-right">
          <Link to="/quirks">
            <button className="my-quirks-button">My Quirks</button>
          </Link>
        </div>
        <div className="centered-content">
          <h1>Welcome to Quirky Human Feats!</h1>
          <Link to="/categories">
            <button className="enter-button">Enter The World Of Absurdity</button>
          </Link>
        </div>
        <Routes>
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/quirks" element={<QuirksPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;
