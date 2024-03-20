// CountsComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CountsComponent.css'; // Import CSS file

const CountsComponent = () => {
  const [counts, setCounts] = useState({ addCount: 0, updateCount: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/counts`);
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="counts-container"> {/* Apply CSS class */}
      <h1>Counts</h1>
      <p>Add Count: {counts.addCount}</p>
      <p>Update Count: {counts.updateCount}</p>
    </div>
  );
};

export default CountsComponent;
