import { useMutation, useQuery, useSubscription } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Loading } from '../../components/loading';
import { CHANGE_ORDER_SUBSCRIPTION, EDIT_USER, GET_ORDER } from '../../gql/all-gql';
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
  <div lat={lat} lng={lng} className="text-5xl">🔴</div>
  )
}

const RiderMarker:React.FunctionComponent<IMarkerProps> = ({lat, lng}) => {
  return (
    //@ts-ignore
    <div lat={lat} lng={lng} className="text-6xl">🛵</div>
  )
}

export const OrderDetail: React.FunctionComponent = () => {
  const { search } = useLocation<ISearchTerm>();
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [riderCoords, setRiderCoords] = useState({ lat: 0, lng: 0 });
  const { data: meData, loading: meLoading, error: meError } = useMe();
  const [editUserMutation] = useMutation<
    editUserMutation,
    editUserMutationVariables
  >(EDIT_USER);
  //const [editOrderMutation, { data: editOrderData } ] = useMutation<editOrderMutation, editOrderMutationVariables>(EDIT_ORDER)
  const {data: changeOrderData } = useSubscription<changeOrderSubscription>(CHANGE_ORDER_SUBSCRIPTION);
  // eslint-disable-next-line
  const [_, orderId] = search.split('=');
  const {
    data: orderData,
    error: orderError,
    loading: orderLoading,
    refetch: getOrderRefetchFunction
  } = useQuery<getOrderQuery, getOrderQueryVariables>(GET_ORDER, {
    variables: { input: { id: +orderId } },
  });
  const googleMapApiLoaded = (map: any, maps: any) => {
    if(maps && map) {
      console.log(map);
      const directionService = new maps.DirectionsService();
      const directionDisplay = new maps.DirectionsRenderer();
      console.log(riderCoords, coords)
      directionService.route({
        origin: new maps.LatLng(riderCoords.lat, riderCoords.lng),
        destination: new maps.LatLng(coords.lat, coords.lng),
        travelMode: maps.TravelMode.TRANSIT,
      }, (response:any, status:any) => {
        if(status === 'OK') {
          console.log(directionDisplay.setDirections);
          directionDisplay.setDirections(response);
          directionDisplay.setOptions({
            polylineOptions: {
              strokeWeight:8,
              strokeColor: '#0d0d73'
            },
          })
          directionDisplay.setMap(map);
        } else {
          console.log(response, status);
        }
      })
    }
  }
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
    if(orderData?.getOrder.order?.rider) {
      setRiderCoords({
        lat: parseFloat(orderData.getOrder.order.rider.lat),
        lng: parseFloat(orderData.getOrder.order.rider.lng)
      })
    }
  }, [orderData?.getOrder.order?.rider]);
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
  useEffect(() => {
    getOrderRefetchFunction();
    if(changeOrderData?.changeOrder.rider?.lat && changeOrderData.changeOrder.rider.lng) {
      setRiderCoords({
        lat: parseFloat(changeOrderData?.changeOrder.rider?.lat),
        lng: parseFloat(changeOrderData?.changeOrder.rider?.lng)
      })
    }
    // eslint-disable-next-line
  }, [changeOrderData?.changeOrder.rider, 
    changeOrderData?.changeOrder.rider?.lat, 
    changeOrderData?.changeOrder.rider?.lng, 
    changeOrderData?.changeOrder.status
    ])
  if (
    orderError ||
    orderLoading ||
    coords.lat === 0 ||
    coords.lng === 0 ||
    meError ||
    meLoading ||
    !orderData
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
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({maps, map}) => googleMapApiLoaded(map,maps)}
        >
          <MyMarker lat={coords.lat} lng={coords.lng} />
          {orderData.getOrder.ok && 
          orderData.getOrder.order?.rider && 
          parseInt(orderData.getOrder.order.rider.lat) !== 0 && 
          parseInt(orderData.getOrder.order.rider.lng) !== 0 &&
          <RiderMarker lat={riderCoords.lat} lng={riderCoords.lng} />
          }
          </GoogleMapReact>
        <div className='w-1/4 h-full flex items-center justify-center'>
          <div className='border border-gray-200 rounded-md h-1/2 w-4/5'>
            <div className="p-3 flex flex-col w-full h-full">
              <div className="w-full flex items-center justify-center">
                <span className="text-xl font-light">Order Specification</span>
              </div>
              <div className="w-full">
                {orderData.getOrder.order?.dishes && orderData.getOrder.order?.dishes.map((dish,index) => {
                  return (
                    <div className="w-full flex items-center mt-8 border-b pb-5 border-gray-300" key={index}>
                      <img src={dish.image} alt={"dishImage"} className="w-20 h-20 rounded-xl" />
                      <div className="flex flex-col w-full ml-5">
                        <span className="text-xl text-gray-500">{dish.name}</span>
                        {orderData.getOrder.order?.dishOption && <span className="text-sm mt-2">Option</span>}
                        <div className="w-full flex flex-col justify-center">
                        {orderData.getOrder.order?.dishOption && orderData.getOrder.order?.dishOption.map((dishOption, index) => {
                          if(!dishOption.choice) {
                            return (
                              <span className="mr-1 text-sm text-gray-500" key={index}>- {dishOption.option}</span>
                              )
                            }
                            return (
                            dishOption.choice.map((choice,index) => {
                              return (
                                <span className="mr-1 text-sm text-gray-500" key={index}>{`- ${dishOption.option} - ${choice.kind}`}</span>
                              )
                            }))
                          })}                        
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-b border-gray-300 pb-5">
                <div className="w-full flex items-center mt-3">
                  <span className="mr-3 text-sm w-1/3">Address: </span>
                  <span className="w-full text-sm text-gray-500">{orderData.getOrder.order?.client.address}</span>
                </div>
                <div className="w-full flex items-center mt-3">
                  <span className="mr-3 text-sm w-1/3">Client: </span>
                  <span className="w-full text-sm text-gray-500">{orderData.getOrder.order?.client.email}</span>
                </div>
                <div className="w-full flex items-center mt-3">
                  <span className="mr-3 text-sm w-1/3">Rider: </span>
                  {orderData.getOrder.order?.rider ? 
                    <span className="w-full text-sm text-gray-500">
                      {orderData.getOrder.order.rider.email}
                    </span> : 
                    <span className="w-full text-sm text-gray-500">
                      Not assign
                    </span>
                  }
                </div>
                <div className="w-full flex items-center mt-3">
                  <span className="mr-3 text-sm w-1/3">Rider phone: </span>
                  {orderData.getOrder.order?.rider ? 
                    <span className="w-full text-sm text-gray-500">
                      {orderData.getOrder.order.rider.phone}
                    </span> : 
                    <span className="w-full text-sm text-gray-500">
                      Not assign
                    </span>
                  }
                </div>
                <div className="w-full flex items-center mt-3">
                  <span className="mr-3 text-sm w-1/3">Price: </span>
                  <span className="w-full text-sm text-gray-500">{`₩ ${orderData.getOrder.order?.totalPrice}`}</span>
                </div>
              </div>
              <div className="w-full h-full flex items-center justify-center text-2xl">
                {orderData.getOrder.order?.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
