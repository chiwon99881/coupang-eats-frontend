import { meQuery } from './../__generated__/meQuery';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';

const ME = gql`
  query meQuery {
    me {
      id
      email
      role
      avatar
      phone
      address
      verified
    }
  }
`;

const useMe = () => {
  return useQuery<meQuery>(ME);
};

export default useMe;
