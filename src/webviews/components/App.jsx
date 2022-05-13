import React, { useContext, useEffect, useState } from "react";
import { RubberDuckerContext } from "../context/RubberDuckerContext";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebaseApp";

import { Card } from "./Card";
import { Profile } from "./Profile";
import { FindCollaborators } from "./FindCollaborators";
import { MessageOverview } from "./MessageOverview";
import { DirectMessages } from "./DirectMessages";
import { Footer } from "./Footer";

export const App = () => {
  const { setAccessToken, setCurrentUser, currentScreen } =
    useContext(RubberDuckerContext);
  const [loggedIn, setLoggedIn] = useState(false);

  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    tsvscode.postMessage({ type: "getToken", value: undefined });
    window.addEventListener("message", async (event) => {
      if (event.data.type !== "accessToken") return;
      const token = event.data.value;
      if (!token) {
        setLoggedIn(false);
      }
      try {
        const bar = httpsCallable(functions, "bar");
        const result = await bar({ accessToken: token });
        setAccessToken(token);
        setCurrentUser(result.data);
        setLoggedIn(true);
      } catch (error) {
        setLoggedIn(false);
        setErrorMessage(error.toString());
      }

      console.log("the access token is", token);
    });
  }, []);

  const loginUser = () => {
    tsvscode.postMessage({ type: "authenticate", value: undefined });
    window.addEventListener("message", async (event) => {
      const message = event.data;
      const token = message.value;
      setAccessToken(token);
      try {
        const getCurrentUser = httpsCallable(functions, "getCurrentUser");
        const currentUser = await getCurrentUser({ accessToken: token });
        console.log("currentUser", currentUser);
      } catch (error) {
        console.log("fucking error", error);
      }
    });
  };

  return (
    <>
      {!loggedIn ? (
        <>
          <button onClick={loginUser}>login</button>
          {errorMessage && <p>{errorMessage}</p>}
        </>
      ) : (
        <>
          {currentScreen === "home" && <FindCollaborators />}

          {currentScreen === "profile" && (
            <Card>
              <Profile />
            </Card>
          )}
          {currentScreen === "message-overview" && (
            <Card>
              <MessageOverview />
            </Card>
          )}
          {currentScreen === "direct-message" && (
            <Card>
              <DirectMessages />
            </Card>
          )}
          <Footer />
        </>
      )}
    </>
  );
};
