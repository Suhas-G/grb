// src/react-auth0-spa.js
import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import axios from "axios";
import { saveAuthData, getAuthData } from "./auth_utils";


const AUTH_URL = 'https://sk16i3rn12.execute-api.us-east-1.amazonaws.com/default/googleOauth';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=") &&
          window.location.search.includes("state=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();
      const alreadyAuthorised = getAuthData();
      

      if (isAuthenticated && !alreadyAuthorised.isAuthorised) {
        const user = await auth0FromHook.getUser();
        const accessToken = await auth0FromHook.getTokenSilently();
        const isAuthorised = await checkAuthorised(accessToken)
        if (isAuthorised) {
          setIsAuthenticated(isAuthorised);
          setUser(user);
          saveAuthData(isAuthorised, accessToken);
        } else {
          setIsAuthenticated(false);
          saveAuthData(false, null);
        }
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
      
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const checkAuthorised = async (accessToken) => {
    var isAuthorised = false;
    try {
      const response = await axios({
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        method: "POST",
        url: AUTH_URL,
        data: {'accessToken': accessToken},
      });
      isAuthorised = response.data.authorised;
    } catch (error) {
      console.error(error)
    }
    return isAuthorised;
  }

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};