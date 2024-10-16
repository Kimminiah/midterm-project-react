import React from 'react';
import { toast } from 'react-toastify';

const DisplayAllItems = ({ items }) => {
  return (
    <div>
      <h2>All Items</h2>
      {items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <table className="item-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayAllItems;
