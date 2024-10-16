import React, { useState } from 'react';
import { toast } from 'react-toastify';

const DisplayByCategory = ({ items }) => {
  const [category, setCategory] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleFilter = () => {
    const result = items.filter(item => item.category === category);
    setFilteredItems(result);
    if (result.length === 0) {
      toast.info("No items found in this category.", {
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div>
      <h2>Display Items by Category</h2>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Entertainment">Entertainment</option>
        {/* Add more categories as needed */}
      </select>
      <button onClick={handleFilter}>Display Items</button>
      
      {filteredItems.length > 0 && (
        <table className="item-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity !== undefined ? item.quantity : 'N/A'}</td>
                <td>${item.price !== undefined ? item.price.toFixed(2) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayByCategory;
