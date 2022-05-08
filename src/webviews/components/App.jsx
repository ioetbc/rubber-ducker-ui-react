import React, { useContext, useEffect, useState } from "react";
import { RubberDuckerContext } from "../context/RubberDuckerContext";
import { httpsCallable } from "firebase/functions";
import { collection, getDocs } from "firebase/firestore";
import { db, functions } from "../../firebaseApp";

import { ProfileCard } from "./ProfileCard";
import { Card } from "./Card";
import { Profile } from "./Profile";

export const App = () => {
  const {
    setAccessToken,
    accessToken,
    setCurrentUser,
    currentUser,
    currentCollaborator,
    currentScreen,
  } = useContext(RubberDuckerContext);
  const [login, setLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    tsvscode.postMessage({ type: "getToken", value: undefined });
    window.addEventListener("message", async (event) => {
      if (event.data.type !== "accessToken") return;
      const token = event.data.value;
      if (!token) {
        setLogin(true);
      }
      try {
        const bar = httpsCallable(functions, "bar");
        const result = await bar({ accessToken: token });
        setAccessToken(token);
        setCurrentUser(result.data);
        setLogin(false);
      } catch (error) {
        setLogin(true);
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

  const checkUser = async () => {
    tsvscode.postMessage({ type: "getToken", value: undefined });
    window.addEventListener("message", async (event) => {
      const message = event.data;

      if (message.type !== "token") return;

      const accessToken = message.value;

      const bar = httpsCallable(functions, "bar");
      const result = await bar({ accessToken });
      console.log("is the user logged in?", result);
    });
  };

  const getAllUsers = async () => {
    const collectionRef = collection(db, "users");
    try {
      const snapshot = await getDocs(collectionRef);
      snapshot.docs.forEach((doc) => {
        setUsers((users) => [...users, { ...doc.data(), id: doc.id }]);
      });
    } catch (error) {
      setErrorMessage(error.toString());
    }
  };

  return (
    <>
      {login ? (
        <>
          <button onClick={loginUser}>login</button>
          {errorMessage && <p>{errorMessage}</p>}
        </>
      ) : (
        <p>already logged in :) {currentUser.username}</p>
      )}

      <button onClick={checkUser}>check user is authenticated</button>
      <button onClick={getAllUsers}>get all users</button>
      {/* {accessToken && accessToken} */}
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
    </>
  );
};
