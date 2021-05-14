/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LikeDishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: likeDishMutation
// ====================================================

export interface likeDishMutation_likeDish {
  __typename: "LikeDishOutput";
  ok: boolean;
  error: string | null;
}

export interface likeDishMutation {
  likeDish: likeDishMutation_likeDish;
}

export interface likeDishMutationVariables {
  input: LikeDishInput;
}
