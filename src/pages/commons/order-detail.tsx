import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Loading } from '../../components/loading';
import { EDIT_USER, GET_ORDER } from '../../gql/all-gql';
import {
  getOrderQuery,
  getOrderQueryVariables,
} from '../../__generated__/getOrderQuery';
import GoogleMap from 'google-map-react';
import { toast } from 'react-toastify';
import useMe from '../../hooks/useMe';
import {
  editUserMutation,
  editUserMutationVariables,
} from '../../__generated__/editUserMutation';

interface ISearchTerm {
  orderId: string;
}

export const OrderDetail: React.FunctionComponent = () => {
  const { search } = useLocation<ISearchTerm>();
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const { data: meData, loading: meLoading, error: meError } = useMe();
  const [editUserMutation, { data: editUserData }] = useMutation<
    editUserMutation,
    editUserMutationVariables
  >(EDIT_USER);
  // eslint-disable-next-line
  const [_, orderId] = search.split('=');
  const {
    data: orderData,
    error: orderError,
    loading: orderLoading,
  } = useQuery<getOrderQuery, getOrderQueryVariables>(GET_ORDER, {
    variables: { input: { id: +orderId } },
  });
  const successGetPosition = async (position: GeolocationPosition) => {
    setCoords({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };
  const successWatchPosition = async (position: GeolocationPosition) => {
    if (
      coords.lat !== position.coords.latitude ||
      coords.lng !== position.coords.longitude
    ) {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }
  };
  const errorGetPosition = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        toast.error('You have to allow location information.');
        return;
      case error.POSITION_UNAVAILABLE:
        toast.error(error.message);
        return;
      case error.TIMEOUT:
        toast.error(error.message);
        return;
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      successGetPosition,
      errorGetPosition,
      {
        enableHighAccuracy: true,
      },
    );
  }, []);
  useEffect(() => {
    navigator.geolocation.watchPosition(
      successWatchPosition,
      errorGetPosition,
      { enableHighAccuracy: true },
    );
    if(meData?.me.ok) {
      editUserMutation(
        {variables:
          {input:
            {id: meData?.me.user?.id!,
            lat: coords.lat.toString(),
            lng: coords.lng.toString()
            }
          }
        }
      );
    }
    // eslint-disable-next-line
  }, [coords]);
  if (
    orderError ||
    orderLoading ||
    coords.lat === 0 ||
    coords.lng === 0 ||
    meError ||
    meLoading
  ) {
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
          center={coords}
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
