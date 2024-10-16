import React from 'react';
import './SortItems.css'; // Optional


const SortItems = ({ items }) => {
  const [sortedItems, setSortedItems] = React.useState(items);

  const handleSort = (order) => {
    const sorted = [...items].sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    setSortedItems(sorted);
  };

  return (
    <div>
      <button onClick={() => handleSort('asc')}>Sort Ascending</button>
      <button onClick={() => handleSort('desc')}>Sort Descending</button>
      <ul>
        {sortedItems.map(item => (
          <li key={item.id}>{item.name} - {item.quantity} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default SortItems;
