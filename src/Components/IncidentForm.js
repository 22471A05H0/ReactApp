import React, { useState } from 'react';
import './IncidentForm.css';
import { db, ref, push, set } from './firebase'; // Import Firebase functions

const IncidentForm = ({ onIncidentSubmit }) => {
  const [incident, setIncident] = useState({
    type: '',
    placeName: '',
    lat: '',
    lng: '',
    description: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncident({ ...incident, [name]: value });
  };

  const handleFileChange = (e) => {
    setIncident({ ...incident, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!incident.placeName) {
      alert('Please provide a place name.');
      return;
    }

    let resolvedLat = parseFloat(incident.lat);
    let resolvedLng = parseFloat(incident.lng);

    // Geocode using OSM if latitude and longitude are not provided
    if (isNaN(resolvedLat) || isNaN(resolvedLng)) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(incident.placeName)}`
        );
        const data = await response.json();
        if (data.length > 0) {
          resolvedLat = parseFloat(data[0].lat);
          resolvedLng = parseFloat(data[0].lon);
        } else {
          alert(`Could not find location for place name: ${incident.placeName}`);
          return;
        }
      } catch (error) {
        console.error('Error fetching geocode data:', error);
        alert('Error fetching location data. Please try again.');
        return;
      }
    }

    // Push data to Firebase Realtime Database
    const incidentRef = ref(db, 'incidents'); // Firebase reference for incidents
    const newIncidentRef = push(incidentRef);
    await set(newIncidentRef, {
      ...incident,
      location: {
        placeName: incident.placeName,
        coordinates: [resolvedLat, resolvedLng],
      },
    });

    // Reset the form
    setIncident({
      type: '',
      placeName: '',
      lat: '',
      lng: '',
      description: '',
      file: null,
    });

    alert('Incident reported successfully!');
  };

  return (
    <div className="incident-form-container">
      <form onSubmit={handleSubmit} className="incident-form">
        <h2 className="form-title">Report an Incident</h2>
        <label>
          Type of Emergency:
          <select
            name="type"
            value={incident.type}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select</option>
            <option value="fire">Fire</option>
            <option value="flood">Flood</option>
            <option value="earthquake">Earthquake</option>
          </select>
        </label>
        <label>
          Place Name:
          <input
            type="text"
            name="placeName"
            value={incident.placeName}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., London"
            required
          />
        </label>
        <label>
          Latitude (Optional):
          <input
            type="text"
            name="lat"
            value={incident.lat}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., 51.505"
          />
        </label>
        <label>
          Longitude (Optional):
          <input
            type="text"
            name="lng"
            value={incident.lng}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., -0.09"
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={incident.description}
            onChange={handleChange}
            className="form-textarea"
          />
        </label>
        <label>
          Attach File:
          <input
            type="file"
            onChange={handleFileChange}
            className="form-file-input"
          />
        </label>
        <button type="submit" className="form-submit-button">
          Submit Incident
        </button>
      </form>
    </div>
  );
};

export default IncidentForm;
