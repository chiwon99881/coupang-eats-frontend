import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { GET_DISH, ORDER } from '../../gql/all-gql';
import {
  getDishQuery,
  getDishQueryVariables,
} from '../../__generated__/getDishQuery';
import { orderMutation, orderMutationVariables } from '../../__generated__/orderMutation';
import { Loading } from '../../components/loading';
import { OrderInput, DishOptionInputType } from '../../__generated__/globalTypes';

interface IParams {
  dishId: string;
}

export const Order: React.FunctionComponent = () => {
  const { dishId } = useParams<IParams>();
  const [ selected, setSelected ] = useState<DishOptionInputType[]>([]);
  const orderInput: OrderInput = {
    dishesId: [+dishId],
    dishOption: selected
  };
  const {
    data: getDishData,
    loading: getDishLoading,
    error: getDishError,
  } = useQuery<getDishQuery, getDishQueryVariables>(GET_DISH, {
    variables: { input: { id: parseInt(dishId) } },
  });
  const [orderMutation, {loading: orderLoading, error: orderError}] = useMutation<orderMutation, orderMutationVariables>(ORDER)
  const setNoChioceOption = (option: string, price: number | null, index: number) => {
    const addOption: DishOptionInputType = {
      option,
      extraPrice: price
    }
    if(Boolean(selected.find(it => it.option === option))) {
      setSelected(prevSelected => (
        prevSelected.filter(selected => selected.option !== option)
      ));
    } else {
      setSelected(prevSelected => [...prevSelected, addOption]);
    }
  }
  if (getDishLoading || getDishError) {
    return (
      <div className='container w-full max-w-full h-screen flex items-center justify-center'>
        <Loading />
      </div>
    );
  } else {
    return (
    <>
      <div className='container w-full max-w-full px-10 mt-32 h-4/5 max-h-full flex items-center'>
        <div className="w-1/2 h-full flex items-center">
            <img src={getDishData?.getDish.dish?.image} className="w-4/5 h-4/5 rounded-lg shadow-2xl" alt={"dishImage"}/>
        </div>
        <div className="w-1/2 h-full flex flex-col p-12">
            <div className="border border-gray-300 rounded-lg p-5 w-full">
                <span className="text-xs text-gray-700">Main</span>
                <div className="flex w-full items-center mt-5">
                    <div className="w-5 h-5 border border-gray-400 mr-3 bg-yellow-900"></div>
                    <span>{`${getDishData?.getDish.dish?.name}  -  ₩ ${getDishData?.getDish.dish?.price}`}</span>
                </div>
            </div>
            <div className="flex flex-col mt-5">
              <div className="border border-gray-300 rounded-lg p-5 w-full">
                  <span className="text-xs text-gray-700">Option</span>
                  {getDishData?.getDish.dish?.dishOption && getDishData.getDish.dish.dishOption.map((option, index) => {
                      if(!option.choice) {
                        return (
                          <div className={`flex w-full items-center mt-5`} key={index}>
                            <div 
                              className={`${Boolean(selected.find(it => it.option === option.option)) ? 'bg-yellow-900' : 'bg-white'} w-5 h-5 border border-gray-400 mr-3 cursor-pointer`} 
                              onClick={() => setNoChioceOption(option.option, option.extraPrice, index)} />
                            <span>{`${option.option}  -  ₩  ${option.extraPrice}`}</span>
                          </div>
                          )
                      } else {
                        return null;
                      }
                  })}
              </div>
              <div className="border border-gray-300 rounded-lg p-5 w-full mt-5">
                  <span className="text-xs text-gray-700">Choice option</span>
                  {getDishData?.getDish.dish?.dishOption && getDishData.getDish.dish.dishOption.map((option, index) => {
                      if(!option.choice) {
                        return null;
                      } else {
                        return (
                          <div className="flex flex-col w-full justify-center mt-5" key={index}>
                            <span>{option.option}</span>
                            <div className="flex items-center w-full">
                              {option.choice && option.choice.map((choice, index) => {
                                return (
                                  <div className="flex w-full items-center mt-2" key={index}>
                                    <div className="w-5 h-5 border border-gray-400 mr-3"></div>
                                    <span>{`${choice.kind}  -  ₩  ${choice.extraPrice || 0}`}</span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                          )
                      }
                  })}
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
