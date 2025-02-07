import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { db, ref, onValue } from './firebase'; // Import Firebase functions
import L from 'leaflet'; // Import Leaflet for custom icons
import 'leaflet/dist/leaflet.css';
import './MapView.css';

// Custom Location Marker Icon
const locationIcon = new L.Icon({
  iconUrl: 'images/istockphoto-1219734277-1024x1024.jpg', // Ensure this file exists in the public/assets/ folder
  iconSize: [32, 32], // Adjust size
  iconAnchor: [16, 32], // Positioning the icon correctly
  popupAnchor: [0, -32], // Popup appears above the marker
});

const MapView = () => {
  const [markers, setMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default center for the map

  useEffect(() => {
    const incidentsRef = ref(db, 'incidents'); // Firebase reference for incidents

    // Listen for changes in the incidents data
    onValue(incidentsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMarkers = [];

      for (const key in data) {
        const incident = data[key];
        if (incident.location && incident.location.coordinates) {
          loadedMarkers.push({
            ...incident,
            position: incident.location.coordinates,
          });
        }
      }

      setMarkers(loadedMarkers);

      if (loadedMarkers.length > 0) {
        setMapCenter(loadedMarkers[0].position); // Center map on first incident
      }
    });
  }, []);

  return (
    <div className="map-container">
      <MapContainer center={mapCenter} zoom={13} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={locationIcon}>
            <Popup>
              <strong>{marker.type}</strong>
              <p>{marker.description}</p>
              <p><em>{marker.location.placeName}</em></p>
            </Popup>
          </Marker>
        ))}
        <MapCenterUpdater center={mapCenter} />
      </MapContainer>
    </div>
  );
};

const MapCenterUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

export default MapView;
