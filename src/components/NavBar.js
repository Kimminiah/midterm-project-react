// components/NavBar.js
import React from 'react';
import './NavBar.css'; // Create a separate CSS file for the NavBar

const NavBar = ({ openModal }) => {
  return (
    <div className="navbar">
      <button onClick={() => openModal('add')}>Add Item</button>
      <button onClick={() => openModal('update')}>Update Item</button>
      <button onClick={() => openModal('remove')}>Remove Item</button>
      <button onClick={() => openModal('category')}>Display By Category</button>
      <button onClick={() => openModal('search')}>Search Item</button>
      <button onClick={() => openModal('sort')}>Sort Items</button>
      <button onClick={() => openModal('lowStock')}>Display Low Stock</button>
      <button onClick={() => openModal('items')}>Display All Items</button>
    </div>
  );
};

export default NavBar;
