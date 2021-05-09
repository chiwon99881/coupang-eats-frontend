/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: meQuery
// ====================================================

export interface meQuery_me_user_favFood_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  tel: string;
  address: string;
}

export interface meQuery_me_user_favFood {
  __typename: "Dish";
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurant: meQuery_me_user_favFood_restaurant;
}

export interface meQuery_me_user {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  avatar: string | null;
  phone: string;
  address: string;
  verified: boolean;
  favFood: meQuery_me_user_favFood[] | null;
}

export interface meQuery_me {
  __typename: "MeOutput";
  ok: boolean;
  error: string | null;
  user: meQuery_me_user | null;
}

export interface meQuery {
  me: meQuery_me;
}
