import { useQuery } from '@apollo/client';
import React from 'react';
import { useLocation } from 'react-router';
import { Loading } from '../../components/loading';
import { GET_ORDER } from '../../gql/all-gql';
import {
  getOrderQuery,
  getOrderQueryVariables,
} from '../../__generated__/getOrderQuery';
interface ISearchTerm {
  orderId: string;
}

export const OrderDetail: React.FunctionComponent = () => {
  const { search } = useLocation<ISearchTerm>();
  // eslint-disable-next-line
  const [_, orderId] = search.split('=');
  const {
    data: orderData,
    error: orderError,
    loading: orderLoading,
  } = useQuery<getOrderQuery, getOrderQueryVariables>(GET_ORDER, {
    variables: { input: { id: +orderId } },
  });
  console.log(orderData, orderError, orderLoading);
  if (orderError || orderLoading) {
    return (
      <div className='container w-full max-w-full h-screen flex items-center justify-center'>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className='container w-full max-w-full px-10 mt-32 h-screen max-h-full flex items-center'>
        <div className='w-3/4 h-full max-h-full bg-red-50'>
          <span>Google Map</span>
        </div>
        <div className='w-1/4 h-full flex items-center justify-center'>
          <div className='border border-gray-200 rounded-md h-1/2 w-4/5'>
            Order
          </div>
        </div>
      </div>
    );
  }
};
