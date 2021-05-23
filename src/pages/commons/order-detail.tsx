import React from 'react';
import { useLocation } from 'react-router';

interface ISearchTerm {
  orderId: string;
}

export const OrderDetail: React.FunctionComponent = () => {
  const { search } = useLocation<ISearchTerm>();
  console.log(search);
  return <span>OrderDetail</span>;
};
