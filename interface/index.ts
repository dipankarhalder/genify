import { ReactNode } from "react";

export type IChildren = {
  children: ReactNode;
};


/* UI Interfaces */
export interface UserSigninInfo {
  email: string;
  password: string;
}
export interface UserFormInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}
export interface ISublistItem {
  name: string;
  path: string;
};
export interface ISidebar {
  name: string;
  path?: string;
  sublist: ISublistItem[];
};

/* API Interfaces */
export interface UserRequestBody {
  first_name: string;
  last_name: string;
  user_id: string;
  email: string;
  phone: string;
  password: string;
}