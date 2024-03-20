// UpdateItemComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import './UpdateItemComponent.css'; // Import CSS file

const UpdateItemComponent = ({ itemId }) => {
  const [name, setName] = useState('');

  const handleUpdateItem = async () => {
    try {
      // Retrieve the itemId from localStorage
      const itemId = localStorage.getItem('itemId');
      await axios.put(`${window.location.origin}/api/items/${itemId}`, { name });
      // Reset the input field after updating the item
      setName('');
      alert('Item updated successfully!');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className="update-item-container"> {/* Apply CSS class */}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleUpdateItem}>Update Item</button>
    </div>
  );
};

export default UpdateItemComponent;
