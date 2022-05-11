import React, { useContext, useEffect, useState } from "react";
import { RubberDuckerContext } from "../context/RubberDuckerContext";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebaseApp";

import { ProfileCard } from "./ProfileCard";
import { Card } from "./Card";
import { Profile } from "./Profile";
import { MessageOverview } from "./MessageOverview";
import { DirectMessages } from "./DirectMessages";
import { SearchableDropdown } from "./DropDown";
import { Pill } from "./Pill";

// make sure that all db queries are reading the gihub_id and not username etc
export const App = () => {
  const { setAccessToken, setCurrentUser, currentScreen, setCurrentScreen } =
    useContext(RubberDuckerContext);
  const [login, setLogin] = useState(false);
  const [techFilters, setTechFilters] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    tsvscode.postMessage({ type: "getToken", value: undefined });
    window.addEventListener("message", async (event) => {
      if (event.data.type !== "accessToken") return;
      const token = event.data.value;
      if (!token) {
        setLogin(false);
      }
      try {
        const bar = httpsCallable(functions, "bar");
        const result = await bar({ accessToken: token });
        setAccessToken(token);
        setCurrentUser(result.data);
        setLogin(true);
      } catch (error) {
        setLogin(false);
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
      const getCurrentUser = httpsCallable(functions, "getCurrentUser");
      const currentUser = await getCurrentUser({ accessToken: token });
      console.log("currentUser", currentUser);
      try {
      } catch (error) {
        console.log("fucking error", error);
      }
    });
  };

  return (
    <>
      {!login ? (
        <>
          <button onClick={loginUser}>login</button>
          {errorMessage && <p>{errorMessage}</p>}
        </>
      ) : (
        <>
          <button onClick={() => setCurrentScreen("message-overview")}>
            messages
          </button>
          <SearchableDropdown
            techFilters={techFilters}
            setTechFilters={setTechFilters}
            setUsers={setUsers}
          />
          {techFilters.map((tech) => (
            <Pill label={tech.type} />
          ))}
          {users.map((user) => (
            <ProfileCard
              github_id={user.github_id}
              profileURL={user.profileURL}
              username={user.username}
            />
          ))}
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
        </>
      )}
    </>
  );
};
