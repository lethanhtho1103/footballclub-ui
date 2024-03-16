import React, { createContext, useState } from 'react';

export const BuyTicketContext = createContext();

const BuyTicketProvider = ({ children }) => {
  const [isShowSeats, setIsShowSeats] = useState(false);
  const [isShowModalBuyTicket, setIsShowModalBuyTicket] = useState(false);
  const [obToast, setObToast] = useState({
    content: '',
    isShow: false,
  });

  function extractHourFromTimeString(timeString) {
    var dateObject = new Date('1970-01-01T' + timeString + 'Z');
    var hour = dateObject.getUTCHours();
    var minute = dateObject.getUTCMinutes();
    var formattedTime = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' : '') + minute;
    return formattedTime;
  }

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleBuyTicketSuccess = (res) => {
    setObToast({ content: res.message, isShow: true });
    setIsShowSeats(false);
    setSelectedSeats([]);
  };
  const handleClickX = () => {
    setIsShowModalBuyTicket(false);
  };

  return (
    <BuyTicketContext.Provider
      value={{
        selectedSeats,
        isShowSeats,
        obToast,
        isShowModalBuyTicket,
        setIsShowSeats,
        setObToast,
        setIsShowModalBuyTicket,
        handleClickX,
        extractHourFromTimeString,
        setSelectedSeats,
        handleBuyTicketSuccess,
      }}
    >
      {children}
    </BuyTicketContext.Provider>
  );
};

export default BuyTicketProvider;
