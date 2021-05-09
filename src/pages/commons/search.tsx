import { useQuery } from '@apollo/client';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
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
      <div className='container w-full max-w-full px-10 mt-32 h-screen'>
        <div className='h-full w-full'>
          <div className='w-full grid grid-cols-1 gap-24 sm:grid-cols-2 md:grid-cols-3'>
            {searchData?.search.dishes && searchData.search.dishCount! > 0 ? searchData?.search.dishes.map(dish => {
              return (
              <Link to={`/dish/${dish.id}`}>
                <div className='flex flex-col items-center'>
                  <img src={dish.image} alt={dish.name} className="w-64 h-64 rounded-full" />
                  <div className="text-2xl mt-3">{dish.name}</div>
                  <div>{dish.price} 원</div>
                </div>
              </Link>
              )
            }) : <div className="h-full w-full felx items-center justify-center">
                <span className="text-7xl font-semibold" >No Result...</span>
              </div>
            }
          </div>
          <div className="mt-10 flex items-center justify-center">
            <div className="w-1/4 flex items-center justify-center">
              {page === 1 ? "" : 
              <div className="cursor-pointer" onClick={() => setPage(currentPage => currentPage-1)}>
                <FontAwesomeIcon icon={faArrowLeft} className="text-3xl text-yellow-900" />
              </div>}
              <div className="px-6 text-3xl text-red-500">{page}</div>
              {page * 6 < searchData?.search.dishCount! ? <div className="cursor-pointer" onClick={() => setPage(currentPage => currentPage+1)}>
                <FontAwesomeIcon icon={faArrowRight} className="text-3xl text-yellow-900" />
              </div>: ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
