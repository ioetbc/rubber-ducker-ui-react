import React from "react";
import { createContext, useState } from "react";

export const RubberDuckerContext = createContext({
  user: null,
  accessToken: null,
});

export const RubberDuckerContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [currentCollaborator, setCurrentCollaborator] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("home");

  return (
    <RubberDuckerContext.Provider
      value={{
        accessToken,
        setAccessToken,
        currentUser,
        setCurrentUser,
        currentCollaborator,
        setCurrentCollaborator,
        currentScreen,
        setCurrentScreen,
      }}
    >
      {children}
    </RubberDuckerContext.Provider>
  );
};
