import React, { useEffect, useState } from 'react';
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-list">
      {categories.map(category => (
        <div key={category._id} className="category-item">
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
