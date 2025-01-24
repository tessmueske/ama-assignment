import React from "react";
import './index.css';
import Data from './Data'

function App() {

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
};

  return (
    <div>
      <div className='header'>
        <h1>AMA EARTH GROUP</h1>
        <h2>Welcome to Ama Earth Group. Our mission is to regenerate the planet.</h2>
      </div>
      <Data formatDate={formatDate}/>
        <p className='center-container'>
          Copyright 2025 Ama Earth Group
        </p>
    </div>
  );
}

export default App;
