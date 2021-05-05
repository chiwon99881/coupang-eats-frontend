import React from 'react';
import { useLocation, useParams } from 'react-router';

export const Search: React.FunctionComponent = () => {
  const { search } = useLocation();
  console.log(search);
  return <div className='mt-32'>Search</div>;
};
