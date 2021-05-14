import { useMutation, useQuery } from '@apollo/client';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/loading';
import useMe from '../../hooks/useMe';
import {
  getDishQuery,
  getDishQueryVariables,
} from '../../__generated__/getDishQuery';
import { likeDishMutation, likeDishMutationVariables } from '../../__generated__/likeDishMutation';
import { meQuery } from '../../__generated__/meQuery';


const GET_DISH = gql`
  query getDishQuery($input: GetDishInput!) {
    getDish(input: $input) {
      ok
      error
      dish {
        id
        name
        description
        price
        image
        restaurant {
          id
          name
          description
          coverImage
          address
          tel
          owner {
            id
            email
            phone
          }
        }
        dishOption {
          option
          choice {
            kind
            extraPrice
          }
          extraPrice
        }
      }
    }
  }
`;

const LIKE_DISH = gql`
  mutation likeDishMutation($input: LikeDishInput!) {
    likeDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

export const DishDetail: React.FunctionComponent = () => {
  const { id: dishId } = useParams<IParams>();
  const { data: meData , error: meError, loading: meLoading } = useMe();
  console.log(meData?.me.user?.favFood, dishId);
  const isLiked = () : boolean => {
    let checkIsLiked = false;
    const favFoods = meData?.me.user?.favFood;
    if(!favFoods) {
      return checkIsLiked;
    }
    favFoods.map(food => {
      if(food.id === parseInt(dishId)) {
        checkIsLiked = true;
      }
    })
    return checkIsLiked;
  }
  const [isLike, setIsLike] = useState<boolean>(isLiked);
  const {
    loading: getDishLoading,
    error: getDishError,
    data: getDishData,
  } = useQuery<getDishQuery, getDishQueryVariables>(GET_DISH, {
    variables: { input: { id: parseInt(dishId) } },
  });
  const [likeDishMutation, {loading: likeDishLoading, error: likeDishError} ] = useMutation<likeDishMutation, likeDishMutationVariables>(LIKE_DISH);
  const likeDish = () => {

  }
  if (getDishLoading || getDishError || meError || meLoading) {
    return (
      <div className='container w-full max-w-full h-screen flex items-center justify-center'>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className='container max-w-full w-full h-screen mt-32 px-10 flex flex-col'>
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
          <div className="py-5 px-6 border border-gray-300 rounded-lg mb-10 hover:border-black cursor-pointer mr-5" onClick={likeDish}>
            <FontAwesomeIcon icon={faHeart} className={`${isLike ? 'text-red-500' : 'text-red-50'} w-32`} />
          </div>
          <Link to={`order/${getDishData?.getDish.dish?.id}`}>
            <div className="p-5 border border-gray-300 rounded-lg mb-10 hover:border-black transition-colors cursor-pointer">
              Start order
            </div>
          </Link>
        </div>
      </div>
    );
  }
};
