import React from 'react';
import { Loading } from '../../components/loading';
import useMe from '../../hooks/useMe';

export const Home: React.FC = () => {
  const { data, loading } = useMe();
  console.log(data);
  if (loading) {
    return <Loading />;
  } else {
    return <span>Home</span>;
  }
};
