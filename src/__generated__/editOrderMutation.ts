/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditStatusOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editOrderMutation
// ====================================================

export interface editOrderMutation_editOrder {
  __typename: "EditStatusOrderOutput";
  ok: boolean;
  error: string | null;
}

export interface editOrderMutation {
  editOrder: editOrderMutation_editOrder;
}

export interface editOrderMutationVariables {
  input: EditStatusOrderInput;
}
