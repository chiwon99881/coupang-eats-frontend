/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createUserMutation
// ====================================================

export interface createUserMutation_createUser_user {
  __typename: "User";
  id: number;
}

export interface createUserMutation_createUser {
  __typename: "CreateUserOutput";
  ok: boolean;
  error: string | null;
  user: createUserMutation_createUser_user | null;
}

export interface createUserMutation {
  createUser: createUserMutation_createUser;
}

export interface createUserMutationVariables {
  input: CreateUserInput;
}
