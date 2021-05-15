import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Loading } from '../../components/loading';
import { DishList } from '../../components/dish-list';
import {
  searchQuery,
  searchQueryVariables,
} from '../../__generated__/searchQuery';
import { Helmet } from 'react-helmet';
import { SEARCH } from '../../gql/all-gql';

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
        <Helmet>
          <title>{`Search Food || ${decodeURI(searchTerm)}`}</title>
        </Helmet>
        <DishList setPage={setPage} page={page} dishes={searchData} />
      </div>
    );
  }
};
