import React from 'react';
import './Subscriptions.css';
import subscriptionsImg from '../assets/Subscriptions.png'; 

const Subscriptions = () => {
  return (
    <div className="subscriptions-container">
      <h1>Subscriptions</h1>
      console.log("IMG:", subscriptionsImg);

      <img
        src={subscriptionsImg}
        alt="Subscriptions"
        className="subscriptions-image"
      />
      <p>This is the Subscriptions page.</p>
    </div>
  );
};

export default Subscriptions;