import { meQuery } from './../__generated__/meQuery';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';

export const ME = gql`
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
        favFood {
          id
          name
          description
          price
          image
          restaurant {
            id
            name
            tel
            address
          }
        }
      }
    }
  }
`;

const useMe = () => {
  return useQuery<meQuery>(ME);
};

export default useMe;
