// import React, {useState} from 'react'
// import { Link , useNavigate } from 'react-router-dom'
// import './Bell.css'
// import ToggleButton from './ToggleButton';



// const Bell = () => {
  
//   const navigate = useNavigate();

//   const [isToggled, setIsToggled] = useState(false);

//   const handleToggle = () => {
//     setIsToggled((prev) => !prev);
//   };

//   return (
//     <div className='main-box'>
//        <div className="top-bar">
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           <i className="fa-solid fa-chevron-left"></i>
//         </button>
//         <p>Notification Setting</p>
//         <div className="top-right">
          
//         </div>
//       </div>
//         <div className="profile-form-container">
          

//           <div className="notification-section">
//             <div> <h3>Personalized Offer</h3>
//             <p>Recieve offers made spacial for you</p></div>
//            <ToggleButton/>
//           </div>

//           <div className="notification-section">
//             <div> <h3>Online Webinars</h3>
//             <p>Get notified about upcomming webinars</p></div>
//            <ToggleButton/>
//           </div>

//           <div className="notification-section">
//             <div> <h3>New Features</h3>
//             <p>Updates about  new features and product releases</p></div>
//            <ToggleButton/>
//           </div>

//           <div className="notification-section">
//             <div> <h3>Securtiy and Billing</h3>
//             <p>Account security and notification about billing</p></div>
//            <ToggleButton/>
//           </div>

//           <div className="notification-section">
//             <div> <h3>Marketing</h3>
//             <p>Recieve marketing newsletters about our new products.</p></div>
//            <ToggleButton/>
//           </div>

//           <div className="button-group">
//           <button className="cancel-btn">Cancel</button>
//           <button className="save-btn">Save</button>
//         </div>
//         </div>



//     </div>
//   )
// }

// export default Bell


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bell.css';
import ToggleButton from './ToggleButton';

const Bell = () => {
  const navigate = useNavigate();

  // State for all toggle options
  const [toggles, setToggles] = useState({
    personalizedOffer: false,
    onlineWebinars: false,
    newFeatures: false,
    securityBilling: false,
    marketing: false,
  });

  // Load saved toggle states from localStorage on mount
  useEffect(() => {
    const savedToggles = JSON.parse(localStorage.getItem('notificationSettings'));
    if (savedToggles) {
      setToggles(savedToggles);
    }
  }, []);

  // Handle individual toggle changes
  const handleToggleChange = (key) => {
    setToggles((prevToggles) => ({
      ...prevToggles,
      [key]: !prevToggles[key],
    }));
  };

  // Save the current toggle states to localStorage
  const handleSave = () => {
    localStorage.setItem('notificationSettings', JSON.stringify(toggles));
    alert('Settings saved successfully!');
  };

  return (
    <div className='main-box'>
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <p>Notification Settings</p>
        <div className="top-right">
        </div>
      </div>
     

      <div className="profile-form-container">
        <div className="notification-section">
          <div>
            <h3>Personalized Offer</h3>
            <p>Receive offers made special for you</p>
          </div>
          <ToggleButton
            isToggled={toggles.personalizedOffer}
            onToggle={() => handleToggleChange('personalizedOffer')}
          />
        </div>

        <div className="notification-section">
          <div>
            <h3>Online Webinars</h3>
            <p>Get notified about upcoming webinars</p>
          </div>
          <ToggleButton
            isToggled={toggles.onlineWebinars}
            onToggle={() => handleToggleChange('onlineWebinars')}
          />
        </div>

        <div className="notification-section">
          <div>
            <h3>New Features</h3>
            <p>Updates about new features and product releases</p>
          </div>
          <ToggleButton
            isToggled={toggles.newFeatures}
            onToggle={() => handleToggleChange('newFeatures')}
          />
        </div>

        <div className="notification-section">
          <div>
            <h3>Security and Billing</h3>
            <p>Account security and billing notifications</p>
          </div>
          <ToggleButton
            isToggled={toggles.securityBilling}
            onToggle={() => handleToggleChange('securityBilling')}
          />
        </div>

        <div className="notification-section">
          <div>
            <h3>Marketing</h3>
            <p>Receive marketing newsletters about new products.</p>
          </div>
          <ToggleButton
            isToggled={toggles.marketing}
            onToggle={() => handleToggleChange('marketing')}
          />
        </div>

        <div className="button-group">
          <button className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Bell;
