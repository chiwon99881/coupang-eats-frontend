import React from 'react';

interface IProps {
  message: string;
}

export const ErrorMessage: React.FunctionComponent<IProps> = ({ message }) => (
  <span className="w-full error">{message}</span>
);
