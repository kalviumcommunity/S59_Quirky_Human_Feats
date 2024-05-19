import React, { useState } from 'react';
import './QuirksPage.css'; // Importing CSS for the form

const AddCategoryForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    Category: '',
    Name: '',
    Quirk: '',
    Level: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/category/add-Category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const newCategory = await response.json();
        onAdd(newCategory);
        setFormData({ Category: '', Name: '', Quirk: '', Level: '' });
      } else {
        console.error("Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category:</label>
        <input
          type="text"
          name="Category"
          value={formData.Category}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Quirk:</label>
        <input
          type="text"
          name="Quirk"
          value={formData.Quirk}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Level:</label>
        <input
          type="text"
          name="Level"
          value={formData.Level}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategoryForm;
