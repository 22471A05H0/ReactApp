import React from 'react';
import './ResourceList.css'; // Import the custom CSS

const ResourceList = () => {
  const resources = ['Ambulances', 'Rescue Boats', 'Medical Kits'];

  return (
    <div className="resource-list-container">
      <h3>Resources</h3>
      <ul>
        {resources.map((resource, index) => (
          <li key={index}>{resource}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceList;
