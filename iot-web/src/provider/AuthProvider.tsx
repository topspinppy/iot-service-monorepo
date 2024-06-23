"use client"

import AuthContext from "@/context/AuthContext";
import { isValidToken, setSession } from "@/utils/auth";
import axios from "@/utils/axios";
import { ReactNode, useEffect, useReducer } from "react";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined ? { type: Key } : { type: Key; payload: M[Key] };
};

export type AuthUser = null | Record<string, any>;

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
};


const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(JWTReducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      try {
        if (isValidToken()) {
          const user: AuthUser = await fetchUser();

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user,
            }
          })
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            }
          })
        }
      } catch (error) {
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    }

    initialize()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });

    const { accessTokenExpiresAt, refreshTokenExpiresAt } = response.data;
    setSession(accessTokenExpiresAt, refreshTokenExpiresAt);

    const user: AuthUser = await fetchUser();

    dispatch({
      type: Types.Login,
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession();
    dispatch({ type: Types.Logout });
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/users/profile");
      const { userName, email, fullName } = response.data;
      return {
        userName,
        email,
        fullName
      };
    } catch (error) {
      return {};
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };

