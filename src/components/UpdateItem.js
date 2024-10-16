import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpdateItem.css'; // Add your custom styles here

const UpdateItem = ({ items, setItems }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  // Categories could be passed as props or fetched from a server
  const categories = ['Electronics', 'Groceries', 'Furniture', 'Clothing'];

  // Fetch the item to update when an ID is entered
  useEffect(() => {
    if (id) {
      const itemToUpdate = items.find(item => item.id === id);
      if (itemToUpdate) {
        setName(itemToUpdate.name);
        setQuantity(itemToUpdate.quantity);
        setPrice(itemToUpdate.price);
        setCategory(itemToUpdate.category);
      } else {
        setName('');
        setQuantity('');
        setPrice('');
        setCategory('');
      }
    }
  }, [id, items]);

  const handleUpdateItem = (e) => {
    e.preventDefault();

    // Check if ID exists
    if (!id) {
      toast.error('Please enter an ID to update.', {
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      return;
    }

    const itemToUpdate = items.find(item => item.id === id);
    if (!itemToUpdate) {
      toast.error('Item not found.', {
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      return;
    }

    // Validate quantity and price
    if (quantity <= 0 || price <= 0) {
      toast.error('Quantity and price must be positive numbers.', {
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
      });
      return;
    }

    // Create the updated item
    const updatedItem = {
      ...itemToUpdate,
      name: name || itemToUpdate.name,
      quantity: quantity ? Number(quantity) : itemToUpdate.quantity,
      price: price ? Number(price) : itemToUpdate.price,
      category: category || itemToUpdate.category,
    };

    // Update the item in the list
    setItems(items.map(item => (item.id === id ? updatedItem : item)));

    // Clear the form
    setId('');
    setName('');
    setQuantity('');
    setPrice('');
    setCategory('');

    // Show success message
    toast.success('Item updated successfully!', {
      autoClose: 1000,
      hideProgressBar: false,
      pauseOnHover: false,
    });
  };

  return (
    <form onSubmit={handleUpdateItem} className="update-item-form">
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
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          type="number"
          placeholder="Enter Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
        Update Item
      </button>
    </form>
  );
};

export default UpdateItem;
