import { useMutation, useQuery, useSubscription } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Loading } from '../../components/loading';
import { CHANGE_ORDER_SUBSCRIPTION, EDIT_ORDER, EDIT_USER, GET_ORDER } from '../../gql/all-gql';
import {
  getOrderQuery,
  getOrderQueryVariables,
} from '../../__generated__/getOrderQuery';
import GoogleMapReact from 'google-map-react';
import { toast } from 'react-toastify';
import useMe from '../../hooks/useMe';
import {
  editUserMutation,
  editUserMutationVariables,
} from '../../__generated__/editUserMutation';
import { changeOrderSubscription } from '../../__generated__/changeOrderSubscription';
import { editOrderMutation, editOrderMutationVariables } from '../../__generated__/editOrderMutation';
import { OrderStatus } from 'src/__generated__/globalTypes';



interface ISearchTerm {
  orderId: string;
}

interface IMarkerProps {
  lat: number;
  lng: number;
}

const MyMarker:React.FunctionComponent<IMarkerProps> = ({lat,lng}) => {
  return (
  //@ts-ignore
  <div lat={lat} lng={lng} className="text-2xl">🔴</div>
  )
}

export const OrderDetail: React.FunctionComponent = () => {
  const { search } = useLocation<ISearchTerm>();
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const { data: meData, loading: meLoading, error: meError } = useMe();
  const [editUserMutation, { data: editUserData }] = useMutation<
    editUserMutation,
    editUserMutationVariables
  >(EDIT_USER);
  const [editOrderMutation, { data: editOrderData, loading: editOrderLoading } ] = useMutation<editOrderMutation, editOrderMutationVariables>(EDIT_ORDER)
  const {data: changeOrderData, loading: changeOrderLoading , error } = useSubscription<changeOrderSubscription>(CHANGE_ORDER_SUBSCRIPTION);
  console.log(changeOrderData, changeOrderLoading, error);
  const test = () => {
    editOrderMutation({variables: {input: {id: 25, status: OrderStatus.COOKING}}});
    console.log(editOrderData?.editOrder.ok);
  }
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
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API! }}
          center={coords}
          defaultZoom={18}
        >
          <MyMarker lat={coords.lat} lng={coords.lng} />
          </GoogleMapReact>
        <div className='w-1/4 h-full flex items-center justify-center'>
          <div className='border border-gray-200 rounded-md h-1/2 w-4/5'>
            <button onClick={test}>Edit Order Test</button>
          </div>
        </div>
      </div>
    );
  }
};
