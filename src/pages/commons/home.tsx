import React from 'react';
import { Helmet } from 'react-helmet';
import { Loading } from '../../components/loading';
import useMe from '../../hooks/useMe';

export const Home: React.FC = () => {
  const { data, loading } = useMe();
  console.log(data);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className='mt-32'>Home</div>
      </>
    );
  }
};
