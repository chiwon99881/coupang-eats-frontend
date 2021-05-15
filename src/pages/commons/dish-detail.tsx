import { useMutation, useQuery } from '@apollo/client';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/loading';
import useMe from '../../hooks/useMe';
import {
  getDishQuery,
  getDishQueryVariables,
} from '../../__generated__/getDishQuery';
import { likeDishMutation, likeDishMutationVariables } from '../../__generated__/likeDishMutation';
import { unlikeDishMutation, unlikeDishMutationVariables } from '../../__generated__/unlikeDishMutation';
import { ME } from '../../hooks/useMe';
import { Helmet } from 'react-helmet';
import { GET_DISH, LIKE_DISH, UNLIKE_DISH } from '../../gql/all-gql';




interface IParams {
  id: string;
}

export const DishDetail: React.FunctionComponent = () => {
  const { id: dishId } = useParams<IParams>();
  const [isLike, setIsLike] = useState<boolean>(false);
  const { data: meData , error: meError, loading: meLoading } = useMe();
  console.log(meData);
  const {
    loading: getDishLoading,
    error: getDishError,
    data: getDishData,
  } = useQuery<getDishQuery, getDishQueryVariables>(GET_DISH, {
    variables: { input: { id: parseInt(dishId) } },
  });
  const [likeDishMutation] = useMutation<likeDishMutation, likeDishMutationVariables>(LIKE_DISH);
  const [unlikeDishMutation] = useMutation<unlikeDishMutation, unlikeDishMutationVariables>(UNLIKE_DISH)
  const toggleLikeDish = (): void => {
    try {
      if(isLike) {
        unlikeDishMutation({variables: {input: {id: parseInt(dishId)}}, refetchQueries: [{query: ME }]});
      } else {
        likeDishMutation({variables:{input: {id: parseInt(dishId)}}, refetchQueries: [{query: ME}]});
      }
    } catch(error) {
      console.log(error);
    }
  }
  console.log(isLike);
  useEffect(() => {
    console.log(meData);
    const favFoods = meData?.me.user?.favFood;
    if(favFoods && favFoods.length > 0) {
      for(const food of favFoods) {
        if(food.id === parseInt(dishId)) {
            setIsLike(true);
            return;
        } else {
          setIsLike(false);
        }
      }
    } else if(favFoods && favFoods.length === 0) {
      setIsLike(false);
    }
  }, [dishId, meData])
  if (getDishLoading || getDishError || meError || meLoading) {
    return (
      <div className='container w-full max-w-full h-screen flex items-center justify-center'>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className='container w-full max-w-full h-screen flex items-center justify-center'>
        <Helmet>
          <title>{`Dish Detail || ${getDishData?.getDish.dish?.name}`}</title>
        </Helmet>
        <div className='w-full flex items-center justify-center h-1/2'>
          <div className='w-1/2 flex items-center justify-center'>
            <img src={getDishData?.getDish.dish?.image} alt={"food"} className="rounded-full w-96 h-96" />
          </div>
          <div className="w-1/2 flex flex-col">
            <div className="border border-gray-300 w-full flex flex-col p-4 rounded-sm">
              <div className="text-xs text-gray-700">Menu info.</div>
              <div>
                <div className="flex items-center mt-2">
                  <div className="text-base mr-3">Menu:</div>
                  <div className="text-base">{getDishData?.getDish.dish?.name}</div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="text-base mr-3">Description:</div>
                  <div className="text-base">{getDishData?.getDish.dish?.description}</div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="text-base mr-3">Price:</div>
                  <div className="text-base">{getDishData?.getDish.dish?.price} 원</div>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 w-full flex flex-col p-4 rounded-sm mt-7">
              <div className="text-xs text-gray-700">Restaurant info.</div>
              <div className="flex items-center mt-4">
                <div className="text-base mr-3">Restaurant:</div>
                <div className="text-base">{getDishData?.getDish.dish?.restaurant.name}</div>
              </div>
              <div className="flex items-center mt-4">
                <div className="text-base mr-3">Address:</div>
                <div className="text-base">{getDishData?.getDish.dish?.restaurant.address}</div>
              </div>
              <div className="flex items-center mt-4">
                <div className="text-base mr-3">Tel:</div>
                <div className="text-base">{getDishData?.getDish.dish?.restaurant.tel}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-1/2 flex items-center justify-center">
          <div className="py-5 px-6 border border-gray-300 rounded-lg mb-10 hover:border-black cursor-pointer mr-5" onClick={toggleLikeDish}>
            <FontAwesomeIcon icon={faHeart} className={`${isLike ? 'text-red-500' : 'text-red-50'} w-32`} />
          </div>
          <Link to={`/order/${getDishData?.getDish.dish?.id}`}>
            <div className="p-5 border border-gray-300 rounded-lg mb-10 hover:border-black transition-colors cursor-pointer">
              Start order
            </div>
          </Link>
        </div>
      </div>
    );
  }
};
