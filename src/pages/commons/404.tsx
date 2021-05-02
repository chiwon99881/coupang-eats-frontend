import React from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="container h-screen mx-auto flex flex-col items-center justify-center">
      <span className="text-9xl font-bold text-gray-700">404</span>
      <span className="text-7xl font-semibold text-gray-900">Not found</span>
      <div className="mt-3 flex items-center">
        <span className="text-xl font-medium text-gray-900 mr-3">
          Invalid URL.. please go back home
        </span>
        <Link to={'/'}>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-2xl text-blue-300"
          />
        </Link>
      </div>
    </div>
  );
};
