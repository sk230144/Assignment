// AddItemComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddItemComponent.css'; // Import CSS file

const AddItemComponent = () => {
  const [name, setName] = useState('');

  const handleAddItem = async () => {
    try {
      const response = await axios.post(`${window.location.origin}/api/items`, { name });
      const { newItem, itemId } = response.data;
      
      // Store the itemId in localStorage
      localStorage.setItem('itemId', itemId);
  
      setName('');
      alert('Item added successfully!');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="add-item-container"> {/* Apply CSS class */}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default AddItemComponent;
