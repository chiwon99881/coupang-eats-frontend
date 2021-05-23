import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router';
import { GET_DISH, ORDER } from '../../gql/all-gql';
import {
  getDishQuery,
  getDishQueryVariables,
} from '../../__generated__/getDishQuery';
import { orderMutation, orderMutationVariables } from '../../__generated__/orderMutation';
import { Loading } from '../../components/loading';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';


interface IParams {
  dishId: string;
}


interface ChoiceTempProps {
  id?: number;
  option?: string;
  choice?: any;
  extraPrice?: number | null;
}

export const Order: React.FunctionComponent = () => {
  const { dishId } = useParams<IParams>();
  const history = useHistory();
  const [ choiceTemp, setChoiceTemp ] = useState<ChoiceTempProps[]>([]);
  const {
    data: getDishData,
    loading: getDishLoading,
    error: getDishError,
  } = useQuery<getDishQuery, getDishQueryVariables>(GET_DISH, {
    variables: { input: { id: parseInt(dishId) } },
  });
  const onCompleted = (data: orderMutation) => {
    if(data.order.ok) {
      toast.success('Order successfully 🤍')
        setTimeout(() => {
          history.push({
            pathname: '/order-detail',
            search: `?orderId=${data.order.order.id}`
          })
        }, 2500);
    }
  }
  const [orderMutation] = useMutation<orderMutation, orderMutationVariables>(ORDER, {onCompleted})
  const setNoChioceOption = (option: string, price: number | null, index:number) => {
    const addOption: ChoiceTempProps = {
      id: index,
      option,
      extraPrice: price
    }
    if(Boolean(choiceTemp.find(it => it.option === option))) {
      setChoiceTemp(prevChoiceTemp => (
        prevChoiceTemp.filter(choiceTemp => choiceTemp.option !== option)
      ));
    } else {
      setChoiceTemp(prevChoiceTemp => [...prevChoiceTemp, addOption]);
    }
  }
  const setChioceOption = (option: string, kind: string, price: number | null, index:number) => {
    let addChoiceOption: ChoiceTempProps = {
      id:0,
      option: "",
      choice: []
    };
    if(price) {
      addChoiceOption = {
        id: index,
        option,
        choice: [
          {
            kind,
            extraPrice: price
          }
        ]
      }
    } else {
      addChoiceOption = {
        id: index,
        option,
        choice: [
          {
            kind
          }
        ]
      }
    }
    console.log(index, Boolean(choiceTemp.find(it => it.id === index)));
    if(Boolean(choiceTemp.find(it => it.id === index))) {
      setChoiceTemp(prevTemp => (
        prevTemp.filter(temp => temp.id !== index)
      ))
    } else {
      setChoiceTemp(prevTemp => {
        if(prevTemp.find(it => it.option === addChoiceOption.option)) {
          const newTemp = prevTemp.filter(it => it.option !== addChoiceOption.option);
          return [...newTemp, addChoiceOption];
        } else {
          return [...prevTemp, addChoiceOption];
        }
      });
    }
  }
  const handleOrder = async () => {
    try {
      let dishOption : any = [];
      dishOption = choiceTemp.map(opt => {
        delete opt.id;
        return opt;
      });
      setChoiceTemp([]);
      await orderMutation({variables: {input: {dishesId: [+dishId], dishOption}}});
    } catch(error) {
      console.log(error);
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
        <Helmet>
          <title>Order</title>
        </Helmet>
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
                              className={`${Boolean(choiceTemp.find(it => it.option === option.option)) ? 'bg-yellow-900' : 'bg-white'} w-5 h-5 border border-gray-400 mr-3 cursor-pointer`} 
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
                                  <div className="flex w-full items-center mt-2" key={index} onClick={() => setChioceOption(option.option, choice.kind, choice.extraPrice, index)}>
                                    <div className={`${Boolean(choiceTemp.find(it => it.id === index)) ? 'bg-yellow-900' : 'bg-white'} w-5 h-5 border border-gray-400 mr-3 cursor-pointer`}></div>
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
        <div className="p-5 mt-6 border border-gray-300 rounded-md hover:border-black cursor-pointer transition-colors" 
          onClick={handleOrder}
        >
          Order
        </div>
      </div>
    </>
    );
  }
};
