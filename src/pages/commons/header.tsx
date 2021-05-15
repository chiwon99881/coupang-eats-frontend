import { faHeart, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../images/coupang-eats-logo-opacity.png';
import React from 'react';
import useMe from '../../hooks/useMe';
import { Link } from 'react-router-dom';

export const Header: React.FunctionComponent = () => {
  // eslint-disable-next-line
  const { loading, error, data } = useMe();

  return (
    <div className='container flex items-center w-full max-w-full left-0 top-0 fixed'>
      <div className='w-1/4'>
        <Link to={'/'}>
          <img src={logo} className='w-52' alt={'logo'} />
        </Link>
      </div>
      <div className='w-2/4' />
      <div className='flex items-center justify-evenly w-1/4 pr-10 pl-24'>
        <Link to={'/my-fav'}>
          <FontAwesomeIcon icon={faHeart} className='text-3xl text-red-500' />
        </Link>
        <Link to={'/my-orders'}>
          <FontAwesomeIcon icon={faList} className='text-3xl text-red-500' />
        </Link>
        <Link to={'/my-profile'}>
          <FontAwesomeIcon icon={faUser} className='text-3xl text-red-500' />
        </Link>
      </div>
    </div>
  );
};
