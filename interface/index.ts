import { ReactNode } from "react";

export type IChildren = {
  children: ReactNode;
};


// UI Interfaces
export interface UserSigninInfo {
  email: string;
  password: string;
}
export interface UserFormInfo {
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  phone: string;
  password: string;
}

// API Interfaces

/* Super User Interface */
export interface UserRequestBody {
  first_name: string;
  last_name: string;
  role: string;
  user_id: string;
  email: string;
  phone: string;
  password: string;
}