import React, { useEffect, useState } from 'react';
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data)
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-list">
      {error && <div className="error-message">{error}</div>}
      {categories && categories.cases.map(category => (
        <div key={`${category._id}-${category.Name}`} className="category-item">
          <h2>{category.Category}</h2>
          <p>Name: {category.Name}</p>
          <p>Quirk: {category.Quirk}</p>
          <p>Level: {category.Level}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
