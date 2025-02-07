import React, { useState } from "react";
import "./Notifications.css";

const Notifications = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendNotification = () => {
    if (message.trim() === "") {
      alert("Please enter a notification message!");
      return;
    }

    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Notification disappears after 3 seconds
  };

  return (
    <div>
      {/* Notification Banner (Displays on Top of Navbar) */}
      {showNotification && (
        <div className="notification-banner">
          🚨 {message}
        </div>
      )}

      {/* Input Field and Button */}
      <div className="notification-container">
        <input
          type="text"
          placeholder="Enter notification message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="notification-input"
        />
        <button onClick={handleSendNotification} className="send-btn">
          Send Notification
        </button>
      </div>
    </div>
  );
};

export default Notifications;
