import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Loading } from '../../components/loading';
import { DishList } from '../../components/dish-list';
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
  // eslint-disable-next-line
  const [_, searchTerm] = search.split('=');
  const [page, setPage] = useState<number>(1);
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
  if (searchLoading || searchError) {
    return (
      <div className='container w-full max-w-full h-screen flex items-center justify-center'>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className='container w-full max-w-full px-10 mt-32 h-screen'>
        <DishList setPage={setPage} page={page} dishes={searchData} />
      </div>
    );
  }
};
