/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: orderMutation
// ====================================================

export interface orderMutation_order {
  __typename: "OrderOutput";
  ok: boolean;
  error: string | null;
}

export interface orderMutation {
  order: orderMutation_order;
}

export interface orderMutationVariables {
  input: OrderInput;
}
