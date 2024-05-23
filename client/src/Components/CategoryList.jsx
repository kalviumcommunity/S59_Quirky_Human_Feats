import React, { useEffect, useState } from 'react';
import './CategoryList.css';
import Delete from './Delete';
import UpdateCategoryForm from './UpdateCategoryForm';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [updatingCategory, setUpdatingCategory] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/category/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        setCategories(data.cases);
        setFilteredCategories(data.cases);

      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/category/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchCategories();
    fetchUsers();
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
      setFilteredCategories(updatedCategories);
      setUpdatingCategory(null);
    } catch (error) {
      console.error('Error updating category:', error.message);
    }
  };

  const handleUserChange = async (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    if (userId) {
      try {
        const response = await fetch(`http://localhost:8080/category/category?created_by=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
        setFilteredCategories(data);
      } catch (error) {
        setError("Failed to fetch categories. Please try again later.");
      }
    } else {
      try {
        const response = await fetch('http://localhost:8080/category/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCategories(data.cases);
        setFilteredCategories(data.cases);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterClick = () => {
    const filtered = categories.filter(category =>
      category.Category.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  return (
    <div className="category-list">
      {error && <div className="error-message">{error}</div>}

      <div>
        <label>Select User:</label>
        <select value={selectedUser} onChange={handleUserChange}>
          <option value="">All Users</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.username}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Filter by Category:</label>
        <input type="text" value={filter} onChange={handleFilterChange} />
        <button onClick={handleFilterClick}>Filter</button>
      </div>
      {filteredCategories.map(category => (

        <div key={category._id} className="category-item">

          <h2>{category.Category}</h2>
          <p>Name: {category.Name}</p>
          <p>Quirk: {category.Quirk}</p>
          <p>Level: {category.Level}</p>
          <p>Created by: {category.created_by?.username || 'Unknown'}</p>
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
