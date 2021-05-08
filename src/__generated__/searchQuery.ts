/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchQuery
// ====================================================

export interface searchQuery_search_restaurants_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface searchQuery_search_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  description: string;
  coverImage: string;
  address: string;
  tel: string;
  category: searchQuery_search_restaurants_category;
}

export interface searchQuery_search_dishes {
  __typename: "Dish";
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface searchQuery_search {
  __typename: "SearchOutput";
  ok: boolean;
  error: string | null;
  restaurants: searchQuery_search_restaurants[] | null;
  restaurantsCount: number | null;
  dishes: searchQuery_search_dishes[] | null;
  dishCount: number | null;
}

export interface searchQuery {
  search: searchQuery_search;
}

export interface searchQueryVariables {
  input: SearchInput;
}
