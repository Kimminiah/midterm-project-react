import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './RemoveItem.css'; // Assuming you have some styles for the form

const RemoveItem = ({ items, onRemoveItem }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  // Handle the search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.id.toString().includes(query)
    );
    setFilteredItems(filtered);
  };

  const confirmRemove = (item) => {
    setItemToRemove(item);
  };

  const handleRemove = () => {
    if (itemToRemove) {
      console.log(`Removing item: ${itemToRemove.name}`); // Debugging line
      onRemoveItem(itemToRemove.id); // Call the function passed from App.js
      toast.success(`${itemToRemove.name} removed successfully!`);
      setItemToRemove(null);
    }
  };

  return (
    <div className="remove-item-container">
      <h2>Remove Item</h2>
      <input
        type="text"
        placeholder="Search by name, category, or ID..."
        value={searchQuery}
        onChange={handleSearch}
        aria-label="Search for an item"
      />
      <table className="item-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>
                  <button onClick={() => confirmRemove(item)}>Remove</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No items found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirmation Modal for removing the item */}
      {itemToRemove && (
        <div className="confirmation-modal">
          <p>Are you sure you want to remove "{itemToRemove.name}"?</p>
          <button onClick={handleRemove}>Yes</button>
          <button onClick={() => setItemToRemove(null)}>No</button>
        </div>
      )}
    </div>
  );
};

export default RemoveItem;
