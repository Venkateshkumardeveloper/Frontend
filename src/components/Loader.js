// Loader.js
import React from 'react';
import { BallTriangle } from 'react-loader-spinner'; // Example loader from react-loader-spinner

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <BallTriangle
        height={100}
        width={100}
        color="blue"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loader;
