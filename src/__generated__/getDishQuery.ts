/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetDishInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getDishQuery
// ====================================================

export interface getDishQuery_getDish_dish_restaurant_owner {
  __typename: "User";
  id: number;
  email: string;
  phone: string;
}

export interface getDishQuery_getDish_dish_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  description: string;
  coverImage: string;
  address: string;
  tel: string;
  owner: getDishQuery_getDish_dish_restaurant_owner;
}

export interface getDishQuery_getDish_dish_dishOption_choice {
  __typename: "OptionChoice";
  kind: string;
  extraPrice: number | null;
}

export interface getDishQuery_getDish_dish_dishOption {
  __typename: "DishOption";
  option: string;
  choice: getDishQuery_getDish_dish_dishOption_choice[] | null;
  extraPrice: number | null;
}

export interface getDishQuery_getDish_dish {
  __typename: "Dish";
  name: string;
  description: string;
  price: number;
  image: string;
  restaurant: getDishQuery_getDish_dish_restaurant;
  dishOption: getDishQuery_getDish_dish_dishOption[] | null;
}

export interface getDishQuery_getDish {
  __typename: "GetDishOutput";
  ok: boolean;
  error: string | null;
  dish: getDishQuery_getDish_dish | null;
}

export interface getDishQuery {
  getDish: getDishQuery_getDish;
}

export interface getDishQueryVariables {
  input: GetDishInput;
}
