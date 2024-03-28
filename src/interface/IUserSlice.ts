import { ITheatre } from "./ITheatreMovie";

export interface UserState {
  user: UserData;
  loading: boolean;
  error: null | string;
}
export interface AdminState {
  theatre: AdminData;
  theatreDetails: ITheatre;
  loading: boolean;
  error: null | string;
}

export interface UserData {
  _id: any;
  username: string;
  email: string;
  role?: string | null;
  message: string;
}

export interface AdminData {
  _id: any;
  username: string;
  email: string;
  role?: string | null;
  message: string;
}

export interface IUserSelector {
  user: UserState;
  loading: boolean;
  error: null | string;
}
export interface IAdminSelector {
  admin: AdminState;
  loading: boolean;
  error: null | string;
}
