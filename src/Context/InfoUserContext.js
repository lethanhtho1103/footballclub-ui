import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { accessTokenSelector, isLoginSelector } from '~/redux/selector';
import { userService } from '~/services';

export const InfoUserContext = createContext();

export const InfoUserProvider = ({ children }) => {
  const [infoUser, setInfoUser] = useState({});
  const isLogIn = useSelector(isLoginSelector);
  const access_token = useSelector(accessTokenSelector);
  const handelGetInfoName = async () => {
    const res = await userService.getInfoUser({ access_token });
    setInfoUser(res);
  };
  useEffect(() => {
    handelGetInfoName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token]);
  return <InfoUserContext.Provider value={{ infoUser, access_token, isLogIn }}>{children}</InfoUserContext.Provider>;
};
