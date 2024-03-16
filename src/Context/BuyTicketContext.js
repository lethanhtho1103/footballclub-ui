import React, { createContext, useEffect, useState } from 'react';

import { userService } from '~/services';

export const BuyTicketContext = createContext();

export const InfoUserProvider = ({ children }) => {
  const [infoUser, setInfoUser] = useState({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <BuyTicketContext.Provider value={{ infoUser }}>{children}</BuyTicketContext.Provider>;
};
