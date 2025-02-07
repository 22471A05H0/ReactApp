import React, { useState } from 'react';
import IncidentForm from './IncidentForm';
import MapView from './MapView';
import ResourceList from './ResourceList';
import Notifications from './Notifications';
import './Dashboard.css';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('incidentForm');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [incidents, setIncidents] = useState([]); // State for incidents

  const handleNotificationsClick = () => {
    const message = 'You have new notifications!';
    alert(message);
    setNotificationMessage(message);
    setActiveComponent('notifications');
  };

  const handleIncidentSubmit = (incident) => {
    // Add the new incident to the state
    setIncidents([...incidents, incident]);
    setActiveComponent('mapView'); // Automatically switch to MapView
  };

  const components = {
    incidentForm: <IncidentForm onIncidentSubmit={handleIncidentSubmit} />,
    mapView: <MapView incidents={incidents} />,
    resourceList: <ResourceList />,
    notifications: <Notifications />,
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="button-group">
        <button
          className={`dashboard-button ${activeComponent === 'incidentForm' ? 'active' : ''}`}
          onClick={() => setActiveComponent('incidentForm')}
        >
          Incident Form
        </button>
        <button
          className={`dashboard-button ${activeComponent === 'mapView' ? 'active' : ''}`}
          onClick={() => setActiveComponent('mapView')}
        >
          Map View
        </button>
        <button
          className={`dashboard-button ${activeComponent === 'resourceList' ? 'active' : ''}`}
          onClick={() => setActiveComponent('resourceList')}
        >
          Resource List
        </button>
        <button
          className={`dashboard-button ${activeComponent === 'notifications' ? 'active' : ''}`}
          onClick={handleNotificationsClick}
        >
          Notifications
        </button>
      </div>
      <div className="content-area">{components[activeComponent]}</div>
    </div>
  );
};

export default Dashboard;
