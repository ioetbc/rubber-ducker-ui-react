import React, { useContext } from "react";
import { RubberDuckerContext } from "../context/RubberDuckerContext";
import { db, auth } from "../../firebaseApp";
import { signInWithCustomToken } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const HomeScreen = () => {
  // const { user } = useContext(RubberDuckerContext);
  // const { username } = user.user;

  return <p>welcome</p>;
};
