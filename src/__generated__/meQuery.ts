/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: meQuery
// ====================================================

export interface meQuery_me_user {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  avatar: string | null;
  phone: string;
  address: string;
  verified: boolean;
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
