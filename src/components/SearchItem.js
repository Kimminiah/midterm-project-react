import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './SearchItem.css'

const SearchItem = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [foundItem, setFoundItem] = useState(null);

  const handleSearch = () => {
    const item = items.find(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFoundItem(item);
    if (!item) {
      toast.info("Item not found.", {
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Item by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {foundItem && (
        <div>
          <p>Item Found: {foundItem.name} - {foundItem.quantity} - ${foundItem.price}</p>
        </div>
      )}
    </div>
  );
};

export default SearchItem;
