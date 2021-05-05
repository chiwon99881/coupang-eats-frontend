import { faHeart, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../images/coupang-eats-logo.png';
import React from 'react';
import useMe from '../../hooks/useMe';
import { Link, useHistory } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormValues {
  key: string;
}

export const Header: React.FunctionComponent = () => {
  const { loading, error, data } = useMe();
  const { register, handleSubmit } = useForm<FormValues>();
  const history = useHistory();
  const onSubmit: SubmitHandler<FormValues> = data => {
    const { key } = data;
    history.push({
      pathname: `/search`,
      search: `?key=${key}`,
    });
  };
  return (
    <div className='container flex items-center w-full max-w-full left-0 top-0 fixed px-2 border-b border-gray-300'>
      <div className='w-1/4'>
        <Link to={'/'}>
          <img src={logo} className='w-52' />
        </Link>
      </div>
      <div className='w-2/4'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <input
            {...register('key')}
            type={'Search'}
            placeholder={'Search Place or Dish 🤍'}
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none placeholder-gray-500 focus:border-blue-300'
          />
        </form>
      </div>
      <div className='flex items-center justify-evenly w-1/4 pr-10 pl-24'>
        <Link to={'/fav'}>
          <FontAwesomeIcon
            icon={faHeart}
            className='text-3xl text-yellow-900'
          />
        </Link>
        <Link to={'/my-orders'}>
          <FontAwesomeIcon icon={faList} className='text-3xl text-yellow-900' />
        </Link>
        <Link to={'/my-profile'}>
          <FontAwesomeIcon icon={faUser} className='text-3xl text-yellow-900' />
        </Link>
      </div>
    </div>
  );
};
