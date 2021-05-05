import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';

const ME = gql`
  query meQuery {
    me {
      ok
      error
      user {
        id
        email
        role
        avatar
        phone
        address
        verified
      }
    }
  }
`;

const useMe = () => {
  return useQuery(ME);
};

export default useMe;
