import React, { useEffect, useState } from "react";
import { db, ref, get, update, remove } from "./firebase";
import './Parentcomponent.css';
import Navbar from './Navbar';

const ParentComponent = () => {
  const [donateData, setDonateData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState("");

  const convertSnapshotToJSON = (snapshot) => {
    if (snapshot.exists()) {
      return Object.entries(snapshot.val());
    }
    return [];
  };

  const fetchData = async () => {
    try {
      const donateSnapshot = await get(ref(db, "donations"));
      setDonateData(convertSnapshotToJSON(donateSnapshot));

      const contactSnapshot = await get(ref(db, "contacts"));
      setContactData(convertSnapshotToJSON(contactSnapshot));

      const loginSnapshot = await get(ref(db, "users"));
      setLoginData(convertSnapshotToJSON(loginSnapshot));
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const itemRef = ref(db, `${formName}/${editingRow}`);
      await update(itemRef, editedData);
      alert(`${formName} record updated successfully.`);
      setEditingRow(null);
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async (formName, id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    try {
      const itemRef = ref(db, `${formName}/${id}`);
      await remove(itemRef);
      alert(`${formName} record deleted successfully.`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (id, data, formName) => {
    setEditingRow(id);
    setEditedData(data);
    setFormName(formName);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        {/* Scrollable Data Box */}
        <div className="data-box">
          <h2>Dashboard Data</h2>

          {/* Donation Data Table */}
          <h3>Donation Data</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Donation Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donateData.map(([id, data]) => (
                <tr key={id}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{Object.keys(data.donationType).filter((key) => data.donationType[key]).join(", ")}</td>
                  <td>
                    <button onClick={() => handleEdit(id, data, "donations")}>Edit</button>
                    <button onClick={() => handleDelete("donations", id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Contact Data Table */}
          <h3>Contact Data</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contactData.map(([id, data]) => (
                <tr key={id}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.subject}</td>
                  <td>{data.message}</td>
                  <td>
                    <button onClick={() => handleEdit(id, data, "contacts")}>Edit</button>
                    <button onClick={() => handleDelete("contacts", id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Login Data Table */}
          <h3>Login Data</h3>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loginData.map(([id, data]) => (
                <tr key={id}>
                  <td>{data.email}</td>
                  <td>{data.password}</td>
                  <td>
                    <button onClick={() => handleEdit(id, data, "users")}>Edit</button>
                    <button onClick={() => handleDelete("users", id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
      </div>

      {/* Modal for Editing */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit {formName} Record</h2>
            {Object.keys(editedData).map((key) => (
              <div key={key}>
                <label>{key}</label>
                <input
                  type="text"
                  name={key}
                  value={editedData[key] || ""}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            <button onClick={handleSave}>Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ParentComponent;
