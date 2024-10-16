import React from 'react';
import './DisplayLowStock.css'; // Optional: import your CSS file for styling

const DisplayLowStock = ({ items }) => {
  const lowStockItems = items.filter(item => item.quantity < 5);

  return (
    <div>
      <h3>Low Stock Items</h3>
      {lowStockItems.length === 0 ? ( // Check if there are low stock items
        <p>No low stock items available.</p>
      ) : (
        <table className="low-stock-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {lowStockItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayLowStock;
