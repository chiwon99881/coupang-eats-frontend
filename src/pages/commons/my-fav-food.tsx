import { faAngleLeft, faAngleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/loading';
import useMe from '../../hooks/useMe';

export const MyFavFood: React.FunctionComponent = () => {
  const { data: meData, loading: meLoading, error: meError } = useMe();
  const [foodIndex, setFoodIndex] = useState<number>(0);
  console.log(meData);
  if (meLoading || meError) {
    return (
      <div className='container w-full max-w-full px-10 mt-32 h-screen flex items-center justify-center'>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className='container w-full max-w-full px-10 mt-32 h-screen'>
        <div className='container w-full max-w-full h-auto text-xl'>
          {`Your Favourite food:`} {meData?.me.user?.favFood && meData.me.user.favFood.length > 0 ? <span className="text-yellow-900">{`${foodIndex+1}/${meData?.me.user?.favFood?.length}`}</span> : "0"}
        </div>
        {meData?.me.user?.favFood && meData.me.user.favFood.length > 0 && 
        <div className='mt-16 container max-w-full w-full h-1/2 flex'>
          <div className="my-auto h-full w-1/4 flex items-center justify-end">
              {foodIndex === 0 ? "" : <FontAwesomeIcon icon={faAngleLeft} className="text-5xl cursor-pointer" onClick={() => setFoodIndex(currentIndex => currentIndex-1)}  />}
          </div>
          <div className='w-2/4 mx-auto  h-full relative items-center justify-center'>
            {meData.me.user.favFood.map((food,index) => {
                return (
                    <div className={`${foodIndex === index ? 'opacity-100': 'opacity-0 pointer-events-none'} w-full absolute top-0 bottom-0`}>
                        <div className={`w-full flex flex-col h-full items-center justify-center`} key={index}>
                            <Link to={`/dish/${food.id}`} className="w-2/3 flex flex-col h-full items-center justify-center">
                                <img src={food.image} className="w-full h-4/5 rounded-md" alt={"foodImage"} />
                                <div className="h-full flex flex-col items-center mt-5">
                                    <span className="text-xl text-gray-600">{food.name}</span>
                                    <span className="text-xl text-gray-600">{food.price}원</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            })}
          </div>
          <div className="w-1/4 h-full flex items-center justify-start">
              {foodIndex+1 === meData.me.user.favFood.length ? "" : <FontAwesomeIcon icon={faAngleRight} className="text-5xl cursor-pointer" onClick={() => setFoodIndex(currentIndex => currentIndex+1)} />}
          </div>
        </div>}
      </div>
    );
  }
};