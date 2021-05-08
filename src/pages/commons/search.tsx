import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Loading } from '../../components/loading';
import {
  searchQuery,
  searchQueryVariables,
} from '../../__generated__/searchQuery';

const SEARCH = gql`
  query searchQuery($input: SearchInput!) {
    search(input: $input) {
      ok
      error
      restaurants {
        id
        name
        description
        coverImage
        address
        tel
        category {
          id
          name
        }
      }
      restaurantsCount
      dishes {
        id
        name
        description
        price
        image
      }
      dishCount
    }
  }
`;

interface iSearchTerm {
  search: string;
}

export const Search: React.FunctionComponent = () => {
  const { search } = useLocation<iSearchTerm>();
  const [_, searchTerm] = search.split('=');
  const [page, setPage] = useState<number>(1);
  console.log(decodeURI(searchTerm));
  const {
    data: searchData,
    error: searchError,
    loading: searchLoading,
  } = useQuery<searchQuery, searchQueryVariables>(SEARCH, {
    variables: {
      input: {
        key: decodeURI(searchTerm),
        page,
      },
    },
  });
  console.log(searchData);
  if (searchLoading || searchError) {
    return (
      <div className='container w-full max-w-full h-screen flex items-center justify-center'>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className='container w-full max-w-full mt-32 h-screen'>
        <div className='h-1/2 flex flex-col'>
          <span className='text-4xl font-semibold text-black'>Dishes</span>
        </div>
        <div className='h-1/2 flex flex-col'>
          <span className='text-4xl font-semibold text-black'>Restaurants</span>
        </div>
      </div>
    );
  }
};
