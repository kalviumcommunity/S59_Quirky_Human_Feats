import React, { useEffect, useState } from 'react';
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Replace the data fetching logic with dummy data
    const dummyData = [
      {
        _id: '1',
        Category: 'Quirky Feats',
        Name: 'John Doe',
        Quirk: 'Juggling Fire',
        Level: 'Expert'
      },
      {
        _id: '2',
        Category: 'Quirky Feats',
        Name: 'Jane Smith',
        Quirk: 'Walking Backwards',
        Level: 'Intermediate'
      },
      {
        _id: '3',
        Category: 'Quirky Feats',
        Name: 'Sam Wilson',
        Quirk: 'Talking with Animals',
        Level: 'Beginner'
      }
    ];

    setCategories(dummyData);
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
