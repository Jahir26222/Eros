import React, { useState } from 'react';
import './SettingProduct.css';
import { useNavigate } from 'react-router-dom';

const SettingProduct = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="main-box">
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <p>Profile Setting</p>
        <div className="top-right">
          
        </div>
      </div>

      <div className="profile-form-container">
        <h3>Profile Details</h3>
        <p className="profile-text">Enter your profile information</p>

        <p>Profile Image</p>
        <div className="img-box">
          <input type="file" id="file" onChange={handleImageChange} />
          <label htmlFor="file">Add File</label>
          <span>Or drag and drop files</span>
        </div>

        <div className="profile-form-section">
          <div className="profile-from">
            <p>First Name</p>
            <input type="text"  />
            <p>Email Address</p>
            <input type="email"  />
          </div>

          <div className="profile-from">
            <p>Last Name</p>
            <input type="text"  />
            <p>Phone Number</p>
            <input type="number"  />
          </div>
        </div>

        <hr />

        <div className="regional-settings">
          <h3>Regional Settings</h3>
          <p id='top-txt'>Set your language and timezone</p>

          <div className="profile-form-section">
            <div className="profile-from">
              <p>Language</p>
              <select>
                <option>English</option>
                <option>Gujarati</option>
                <option>Hindi</option>
              </select>
            </div>

            <div className="profile-from">
              <p>Timezone</p>
              <select>
                <option>GMT +00:00</option>
                <option>GMT +02:00</option>
                <option>GMT -05:00</option>
              </select>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
};

export default SettingProduct;
