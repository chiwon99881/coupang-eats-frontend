/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: orderMutation
// ====================================================

export interface orderMutation_order_order_dishes {
  __typename: "Dish";
  name: string;
  description: string;
  image: string;
}

export interface orderMutation_order_order_dishOption_choice {
  __typename: "OptionChoice";
  kind: string;
}

export interface orderMutation_order_order_dishOption {
  __typename: "DishOption";
  option: string;
  choice: orderMutation_order_order_dishOption_choice[] | null;
}

export interface orderMutation_order_order {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  dishes: orderMutation_order_order_dishes[];
  totalPrice: number;
  dishOption: orderMutation_order_order_dishOption[] | null;
}

export interface orderMutation_order {
  __typename: "OrderOutput";
  ok: boolean;
  error: string | null;
  order: orderMutation_order_order;
}

export interface orderMutation {
  order: orderMutation_order;
}

export interface orderMutationVariables {
  input: OrderInput;
}
