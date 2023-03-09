import React, { useContext, createContext, useState } from "react";

interface User {
  username: string;
  email: string;
  id: string;
  imageUrl: string | null;
}

export interface Auth {
  user: User;
  token: string;
  isLoggedIn: boolean;
}

const initialState: Auth = {
  user: { username: "", email: "", id: "", imageUrl: "" },
  token: "",
  isLoggedIn: false,
};

const AuthContext = createContext<Auth>(initialState);
const updateAuthContext = createContext<(payload: Auth) => void>(() => {});

export const useAuth = () => {
  return useContext<Auth>(AuthContext);
};

export const useUpdateAuth = (payload: Auth) => {
  return useContext<(payload: Auth) => void>(updateAuthContext);
};

interface ProviderProps {
  children: JSX.Element;
}

export const AuthProvider: React.FC<ProviderProps> = (props): JSX.Element => {
  const [auth, setAuth] = useState<Auth>(initialState);

  const updateAuth = (payload: Auth) => {
    setAuth({
      user: payload.user,
      token: payload.token,
      isLoggedIn: payload.isLoggedIn,
    });

    localStorage.setItem("auth", JSON.stringify(payload));
  };

  return (
    <AuthContext.Provider value={auth}>
      <updateAuthContext.Provider value={updateAuth}>
        {props.children}
      </updateAuthContext.Provider>
    </AuthContext.Provider>
  );
};
