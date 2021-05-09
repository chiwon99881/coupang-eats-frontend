import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import { Loading } from '../../components/loading';
import {
  getDishQuery,
  getDishQueryVariables,
} from '../../__generated__/getDishQuery';

const GET_DISH = gql`
  query getDishQuery($input: GetDishInput!) {
    getDish(input: $input) {
      ok
      error
      dish {
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

interface IParams {
  id: string;
}

export const DishDetail: React.FunctionComponent = () => {
  const { id: dishId } = useParams<IParams>();
  const {
    loading: getDishLoading,
    error: getDishError,
    data: getDishData,
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
      <div className='container max-w-full w-full h-screen mt-32 px-10 bg-red-400 flex flex-col'>
        <div className='w-full flex items-center justify-center h-1/2 bg-blue-400'>
          <div className='w-1/2 flex items-center justify-center'>
            {/* <img src={} alt={"food"} /> */}
          </div>
        </div>
      </div>
    );
  }
};
