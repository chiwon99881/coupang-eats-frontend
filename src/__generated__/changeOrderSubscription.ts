/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: changeOrderSubscription
// ====================================================

export interface changeOrderSubscription_changeOrder_client {
  __typename: "User";
  id: number;
  email: string;
}

export interface changeOrderSubscription_changeOrder_rider {
  __typename: "User";
  id: number;
  email: string;
  lat: string;
  lng: string;
}

export interface changeOrderSubscription_changeOrder {
  __typename: "Order";
  id: number;
  client: changeOrderSubscription_changeOrder_client;
  rider: changeOrderSubscription_changeOrder_rider | null;
  status: OrderStatus;
}

export interface changeOrderSubscription {
  changeOrder: changeOrderSubscription_changeOrder;
}
