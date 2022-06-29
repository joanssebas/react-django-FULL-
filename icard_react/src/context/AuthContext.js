import React, {useState, useEffect, createContext} from "react";
import {setToken, getToken, removeToken} from "../api/token";
import {useUser} from "../hooks";

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
});

export function AuthProvider(props) {
  const {children} = props;
  const [auth, setAuth] = useState(undefined);
  const {getMe} = useUser();

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        const me = await getMe(token);
        //console.log(me);
        setAuth({token, me});
      } else {
        setAuth(null);
      }
      //console.log(token);
    })();
  }, []);

  const login = async (token) => {
    setToken(token);
    //console.log("Context login --->", token);
    const me = await getMe(token);
    setAuth({token, me});
    //console.log(me);
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
    }
  };

  const valueContext = {
    auth,
    login,
    logout,
  };

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
