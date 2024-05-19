import React, { useState } from 'react';

const UpdateCategoryForm = ({ category, onUpdate }) => {
  const [formData, setFormData] = useState({
    Category: category.Category,
    Name: category.Name,
    Quirk: category.Quirk,
    Level: category.Level,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...category, ...formData });
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
      <button type="submit">Update Category</button>
    </form>
  );
};

export default UpdateCategoryForm;
