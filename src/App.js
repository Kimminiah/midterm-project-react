import React, { useState } from 'react';
import AddItem from './components/AddItem';
import UpdateItem from './components/UpdateItem';
import Modal from './components/modal';
import DisplayByCategory from './components/DisplayByCategory';
import RemoveItem from './components/RemoveItem';
import SearchItem from './components/SearchItem';
import SortItems from './components/SortItems';
import LowStock from './components/DisplayLowStock';
import DisplayAllItems from './components/DisplayAllItems';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import NavBar from './components/NavBar'; // Import the NavBar component

const App = () => {
  const [showModal, setShowModal] = useState(null);
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', category: 'Electronics' },
    { id: 2, name: 'Item 2', category: 'Clothing' },
    { id: 3, name: 'Item 3', category: 'Entertainment' },
  ]); // State to manage items

  const openModal = (modalType) => {
    setShowModal(modalType);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  const handleItemAdded = (newItem) => {
    setItems([...items, newItem]); // Update the items state
    closeModal();
    toast.success('Item added successfully!', {
      autoClose: 1000,
      hideProgressBar: false,
      pauseOnHover: false,
    });
  };

  const handleItemRemoved = (id) => {
    setItems(items.filter((item) => item.id !== id)); // Remove item by ID
    toast.success('Item removed successfully!', {
      autoClose: 1000,
      hideProgressBar: false,
      pauseOnHover: false,
    });
  };

  return (
    <div className="app-container">
      <ToastContainer />
      <h1>Inventory Management System</h1>
      <NavBar openModal={openModal} /> {/* Use the NavBar component */}

      {/* Modals */}
      <Modal show={showModal === 'add'} onClose={closeModal}>
        <AddItem onItemAdded={handleItemAdded} existingItems={items} />
      </Modal>

      <Modal show={showModal === 'update'} onClose={closeModal}>
        <UpdateItem items={items} setItems={setItems} />
      </Modal>

      <Modal show={showModal === 'remove'} onClose={closeModal}>
        <RemoveItem items={items} onRemoveItem={handleItemRemoved} />
      </Modal>

      <Modal show={showModal === 'category'} onClose={closeModal}>
        <DisplayByCategory items={items} />
      </Modal>

      <Modal show={showModal === 'search'} onClose={closeModal}>
        <SearchItem items={items} />
      </Modal>

      <Modal show={showModal === 'sort'} onClose={closeModal}>
        <SortItems items={items} setItems={setItems} />
      </Modal>

      <Modal show={showModal === 'lowStock'} onClose={closeModal}>
        <LowStock items={items} />
      </Modal>

      <Modal show={showModal === 'items'} onClose={closeModal}>
        <DisplayAllItems items={items} />
      </Modal>
    </div>
  );
};

export default App;
