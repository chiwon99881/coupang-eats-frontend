import React from 'react';
import logo from '../../images/coupang-eats-logo.png';

export const Home = () => {
  return (
    <div className="container h-screen mx-auto flex flex-col items-center">
      <div
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: 600,
          backgroundRepeat: 'no-repeat',
        }}
        className="p-32 bg-contain bg-center"
      ></div>
      <div className="w-2/5 h-3/5 flex justify-center border border-gray-300 rounded-md"></div>
    </div>
  );
};
