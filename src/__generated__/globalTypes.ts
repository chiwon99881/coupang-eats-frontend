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

export interface CategoryInput {
  name: string;
  image: string;
  restaurants?: RestaurantInputType[] | null;
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

export interface DishInputType {
  name: string;
  description: string;
  price: number;
  image: string;
  restaurant: RestaurantInputType;
  dishOption?: DishOptionInputType[] | null;
  orders?: OrderInputType[] | null;
  liked?: UserInputType[] | null;
}

export interface DishOptionInputType {
  option: string;
  choice?: OptionChoiceInputType[] | null;
  extraPrice?: number | null;
}

export interface EditUserInput {
  id: number;
  createdAt?: any | null;
  updatedAt?: any | null;
  password?: string | null;
  verified?: boolean | null;
  alias?: string | null;
  avatar?: string | null;
  phone?: string | null;
  address?: string | null;
  lat?: string | null;
  lng?: string | null;
  role?: UserRole | null;
  orders?: OrderInputType[] | null;
  favFood?: DishInputType[] | null;
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

export interface OrderInputType {
  client: UserInputType;
  rider?: UserInputType | null;
  status: OrderStatus;
  dishes: DishInputType[];
  totalPrice?: number | null;
  dishOption?: DishOptionInputType[] | null;
}

export interface RestaurantInputType {
  name: string;
  description: string;
  coverImage: string;
  address: string;
  tel: string;
  owner: UserInputType;
  category: CategoryInput;
  dishes?: DishInputType[] | null;
}

export interface SearchInput {
  key: string;
  page?: number | null;
}

export interface UnlikeDishInput {
  id: number;
}

export interface UserInputType {
  email: string;
  password: string;
  verified?: boolean | null;
  alias?: string | null;
  avatar?: string | null;
  phone: string;
  address: string;
  lat?: string | null;
  lng?: string | null;
  role: UserRole;
  restaurants?: RestaurantInputType[] | null;
  orders?: OrderInputType[] | null;
  favFood?: DishInputType[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
