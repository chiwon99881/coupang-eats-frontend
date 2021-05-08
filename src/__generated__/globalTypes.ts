/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

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

export interface LoginInput {
  email: string;
  password: string;
}

export interface SearchInput {
  key: string;
  page?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
