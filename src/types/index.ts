import { email } from 'zod/v4-mini';

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
}
export type IContextType={
  user:INewUser;
  isLoading:boolean;
  setUser:React.Dispatch<React.SetStateAction<INewUser>>;
  isAuthenticated:boolean;
  setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>
  checkAuthUser:()=>Promise<boolean>
}
export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};