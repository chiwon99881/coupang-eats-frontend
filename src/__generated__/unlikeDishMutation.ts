/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UnlikeDishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: unlikeDishMutation
// ====================================================

export interface unlikeDishMutation_unlikeDish {
  __typename: "UnlikeDishOutput";
  ok: boolean;
  error: string | null;
}

export interface unlikeDishMutation {
  unlikeDish: unlikeDishMutation_unlikeDish;
}

export interface unlikeDishMutationVariables {
  input: UnlikeDishInput;
}
