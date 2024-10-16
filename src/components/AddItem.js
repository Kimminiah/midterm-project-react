import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddItem.css'; // Add your custom styles here

const AddItem = ({ onItemAdded, existingItems }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  // Categories could be passed as props or fetched from a server
  const categories = ['Electronics', 'Entertainment', 'Clothing'];

  const handleAddItem = (e) => {
    e.preventDefault();

    // Validate input
    if (!id || !name || !quantity || !price || !category) {
      toast.error("Please fill in all fields correctly.", {
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      return;
    }

    if (existingItems.some(item => item.id === id)) {
      toast.error("Item ID must be unique.", {
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      return;
    }

    if (quantity <= 0 || price <= 0) {
      toast.error("Quantity and price must be positive numbers.", {
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      return;
    }

    // Create the new item
    const newItem = { id, name, quantity: Number(quantity), price: Number(price), category };

    // Pass the new item to the parent component
    onItemAdded(newItem);

    // Clear the form after submission
    setId('');
    setName('');
    setQuantity('');
    setPrice('');
    setCategory('');

    // Show success message
    toast.success('Item added successfully!', {
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: false,
    });
  };

  return (
    <form onSubmit={handleAddItem} className="add-item-form">
      <div className="form-group">
        <label htmlFor="id">Item ID:</label>
        <input
          id="id"
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="name">Item Name:</label>
        <input
          id="name"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          type="number"
          min="1"
          placeholder="Enter Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="submit-btn">
        Add Item
      </button>
    </form>
  );
};

export default AddItem;
