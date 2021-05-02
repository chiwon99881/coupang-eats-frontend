import loading from '../images/loading.jpeg';
import React from 'react';

export const Loading: React.FunctionComponent = () => {
  return <img src={loading} className="w-16 animate-spin" alt={'loading'} />;
};
