/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderStatus {
  COOKED = "COOKED",
  COOKING = "COOKING",
  DELIVERED = "DELIVERED",
  PENDING = "PENDING",
  PICKUP = "PICKUP",
  REJECTED = "REJECTED",
}

export enum UserRole {
  Client = "Client",
  Owner = "Owner",
  Rider = "Rider",
}

export interface CreateUserInput {
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserRole;
  alias?: string | null;
  avatar?: string | null;
}

export interface DishOptionInputType {
  option: string;
  choice?: OptionChoiceInputType[] | null;
  extraPrice?: number | null;
}

export interface GetDishInput {
  id: number;
}

export interface GetOrderInput {
  id: number;
}

export interface LikeDishInput {
  id: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface OptionChoiceInputType {
  kind: string;
  extraPrice?: number | null;
}

export interface OrderInput {
  dishesId: number[];
  dishOption?: DishOptionInputType[] | null;
}

export interface SearchInput {
  key: string;
  page?: number | null;
}

export interface UnlikeDishInput {
  id: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
