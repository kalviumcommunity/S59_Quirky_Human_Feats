import React, { useState } from 'react';
import AddCategoryForm from './AddCategoryForm';
import './QuirksPage.css';

const QuirksPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
    setSuccessMessage('Category added successfully!');
    setShowForm(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="quirks-page">
      <button className="add-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add Quirk'}
      </button>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {showForm && <AddCategoryForm onAdd={handleAddCategory} />}
      <div className="category-list">
        {categories.map(category => (
          <div key={`${category._id}-${category.Name}`} className="category-item">
            <h2>{category.Category}</h2>
            <p>Name: {category.Name}</p>
            <p>Quirk: {category.Quirk}</p>
            <p>Level: {category.Level}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuirksPage;
