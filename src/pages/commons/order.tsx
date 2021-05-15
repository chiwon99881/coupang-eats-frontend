import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { GET_DISH } from '../../gql/all-gql';
import {
  getDishQuery,
  getDishQueryVariables,
} from '../../__generated__/getDishQuery';
import { Loading } from '../../components/loading';

interface IParams {
  dishId: string;
}

export const Order: React.FunctionComponent = () => {
  const { dishId } = useParams<IParams>();
  const {
    data: getDishData,
    loading: getDishLoading,
    error: getDishError,
  } = useQuery<getDishQuery, getDishQueryVariables>(GET_DISH, {
    variables: { input: { id: parseInt(dishId) } },
  });
  console.log(getDishData);
  if (getDishLoading || getDishError) {
    return (
      <div className='container w-full max-w-full h-screen flex items-center justify-center'>
        <Loading />
      </div>
    );
  } else {
    return (
    <>
      <div className='container w-full max-w-full px-10 mt-32 h-auto max-h-full flex items-center'>
        <div className="w-1/2 h-full flex items-center">
            <img src={getDishData?.getDish.dish?.image} className="w-4/5 h-4/5 rounded-lg shadow-2xl" alt={"dishImage"}/>
        </div>
        <div className="w-1/2 h-full flex flex-col p-12">
            <div className="border border-gray-300 rounded-lg p-10 w-full">
                <span className="text-xs text-gray-700">Main</span>
                <div className="flex w-full items-center mt-5">
                    <div className="w-5 h-5 border border-gray-400 mr-3"></div>
                    <span>{`${getDishData?.getDish.dish?.name}  -  ₩ ${getDishData?.getDish.dish?.price}`}</span>
                </div>
            </div>
            <div className="border border-gray-300 rounded-lg p-10 w-full mt-20">
                <span className="text-xs text-gray-700">Option</span>
                <div className="flex w-full items-center mt-5">
                    
                </div>
            </div>
        </div>
      </div>
      <div className="container w-full max-w-full px-10 h-auto flex items-center justify-center">
        <div className="p-5 mt-6 border border-gray-300 rounded-md hover:border-black cursor-pointer transition-colors">Order</div>
      </div>
    </>
    );
  }
};
