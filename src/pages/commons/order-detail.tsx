import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Loading } from '../../components/loading';
import { GET_ORDER } from '../../gql/all-gql';
import {
  getOrderQuery,
  getOrderQueryVariables,
} from '../../__generated__/getOrderQuery';
import GoogleMap from 'google-map-react';

interface ISearchTerm {
  orderId: string;
}

export const OrderDetail: React.FunctionComponent = () => {
  const { search } = useLocation<ISearchTerm>();
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
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
  const successGetPosition = async (position: GeolocationPosition) => {
    setCoords({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };
  const errorGetPosition = (error: GeolocationPositionError) => {
    console.log(error.message);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      successGetPosition,
      errorGetPosition,
      { enableHighAccuracy: true },
    );
  }, []);
  if (orderError || orderLoading || coords.lat === 0 || coords.lng === 0) {
    return (
      <div className='container w-full max-w-full h-screen flex items-center justify-center'>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className='container w-full max-w-full px-10 mt-32 h-screen max-h-full flex items-center'>
        <GoogleMap
          bootstrapURLKeys={{ key: 'AIzaSyC5H0SoPFdUR0gRKDDISaKmIMX1aNZ3iYE' }}
          defaultCenter={coords}
          defaultZoom={18}
        />
        <div className='w-1/4 h-full flex items-center justify-center'>
          <div className='border border-gray-200 rounded-md h-1/2 w-4/5'>
            Order
          </div>
        </div>
      </div>
    );
  }
};
