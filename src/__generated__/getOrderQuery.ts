/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrderInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getOrderQuery
// ====================================================

export interface getOrderQuery_getOrder_order_client {
  __typename: "User";
  email: string;
  address: string;
  phone: string;
  avatar: string | null;
}

export interface getOrderQuery_getOrder_order_rider {
  __typename: "User";
  email: string;
  address: string;
  phone: string;
  avatar: string | null;
  lat: string;
  lng: string;
}

export interface getOrderQuery_getOrder_order_dishes_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  description: string;
  tel: string;
  address: string;
}

export interface getOrderQuery_getOrder_order_dishes {
  __typename: "Dish";
  id: number;
  name: string;
  description: string;
  image: string;
  restaurant: getOrderQuery_getOrder_order_dishes_restaurant;
}

export interface getOrderQuery_getOrder_order_dishOption_choice {
  __typename: "OptionChoice";
  kind: string;
  extraPrice: number | null;
}

export interface getOrderQuery_getOrder_order_dishOption {
  __typename: "DishOption";
  option: string;
  choice: getOrderQuery_getOrder_order_dishOption_choice[] | null;
  extraPrice: number | null;
}

export interface getOrderQuery_getOrder_order {
  __typename: "Order";
  client: getOrderQuery_getOrder_order_client;
  rider: getOrderQuery_getOrder_order_rider | null;
  status: OrderStatus;
  dishes: getOrderQuery_getOrder_order_dishes[];
  totalPrice: number;
  dishOption: getOrderQuery_getOrder_order_dishOption[] | null;
}

export interface getOrderQuery_getOrder {
  __typename: "GetOrderOutput";
  ok: boolean;
  error: string | null;
  order: getOrderQuery_getOrder_order | null;
}

export interface getOrderQuery {
  getOrder: getOrderQuery_getOrder;
}

export interface getOrderQueryVariables {
  input: GetOrderInput;
}
