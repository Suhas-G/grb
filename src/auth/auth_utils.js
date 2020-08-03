import React from 'react';
import { useAuth0 } from './react-auth0-spa';


export const withAuthenticatedHOC = (Component) => {
  return (props) => {
    const {isAuthenticated} = useAuth0();

    return <Component isAuthenticated={isAuthenticated} {...props} />;
  };
};

export const saveAuthData = (isAuthorised, accessToken) => {
  if (isAuthorised) {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('isAuthorised', isAuthorised);
  } else {
    sessionStorage.setItem('isAuthorised', false);
    sessionStorage.removeItem('accessToken');
  }
}

export const getAuthData = () => {
  const isAuthorised = sessionStorage.getItem('isAuthorised') === 'true';
  if (isAuthorised) {
    const accessToken = sessionStorage.getItem('accessToken');
    return {'isAuthorised': isAuthorised, 'accessToken': accessToken};
  }
  return {'isAuthorised': false};
}
