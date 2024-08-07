import React from 'react';

const Loader = ({isTransparent}) => {
  return (
      <div className={`fixed ${isTransparent ? 'inset-x-0 top-1/2 h-16 bg-transparent opacity-70' : 'inset-0 bg-frGreen opacity-80'} flex items-center justify-center`}>
          <div id="load" className="loading-pulse">
          </div>
      </div>
  );
};

export default Loader;