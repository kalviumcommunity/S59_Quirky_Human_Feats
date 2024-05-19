import React, { useEffect, useState } from 'react';
import './CategoryList.css';
import Delete from './Delete';
import UpdateCategoryForm from './UpdateCategoryForm';

const CategoryList = () => {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);
  const [updatingCategory, setUpdatingCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        console.log(data);

        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchCategories();
  }, []);

  const handleUpdate = async (updatedCategory) => {
    try {
      const response = await fetch(`http://localhost:8080/category/${updatedCategory._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategory),
      });
      if (!response.ok) {
        throw new Error(`Error updating category: ${response.statusText}`);
      }
      const updatedCategories = categories.map(cat =>
        cat._id === updatedCategory._id ? updatedCategory : cat
      );
      setCategories(updatedCategories);
      setUpdatingCategory(null);
    } catch (error) {
      console.error('Error updating category:', error.message);
    }
  };

  return (
    <div className="category-list">
      {error && <div className="error-message">{error}</div>}
      {categories && categories.cases.map(category => (

        <div key={category._id} className="category-item">

          <h2>{category.Category}</h2>
          <p>Name: {category.Name}</p>
          <p>Quirk: {category.Quirk}</p>
          <p>Level: {category.Level}</p>
          <button onClick={() => setUpdatingCategory(category)}>Update</button>
          <Delete id={category._id} />
          {updatingCategory && updatingCategory._id === category._id && (
            <UpdateCategoryForm category={category} onUpdate={handleUpdate} />
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
