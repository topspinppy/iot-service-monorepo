import { createContext } from "react";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined ? { type: Key } : { type: Key; payload: M[Key] };
};


export type AuthUser = null | Record<string, any>;


export type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'jwt';
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};


const AuthContext = createContext<JWTContextType | null>(null)

export default AuthContext;