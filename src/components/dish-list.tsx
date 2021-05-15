import React from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { searchQuery } from '../__generated__/searchQuery';


interface IProps {
    dishes?: searchQuery | undefined;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const DishList :React.FunctionComponent<IProps> = ({dishes, page, setPage}) => {
    return (
        <div className='h-full w-full'>
          <div className='w-full grid grid-cols-1 gap-24 sm:grid-cols-2 md:grid-cols-3'>
            {dishes?.search.dishes && dishes.search.dishCount! > 0 ? dishes?.search.dishes.map((dish, index) => {
              return (
              <Link to={`/dish/${dish.id}`} key={index}>
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
              {page * 6 < dishes?.search.dishCount! ? <div className="cursor-pointer" onClick={() => setPage(currentPage => currentPage+1)}>
                <FontAwesomeIcon icon={faArrowRight} className="text-3xl text-yellow-900" />
              </div>: ""}
            </div>
          </div>
        </div>
    )
}