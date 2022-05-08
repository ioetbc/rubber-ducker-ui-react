import React, { useContext } from "react";
import { RubberDuckerContext } from "../context/RubberDuckerContext";
import { db, auth } from "../../firebaseApp";
import { signInWithCustomToken, getToken } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const SignInScreen = () => {
  // const { user, setUser } = useContext(RubberDuckerContext);

  const handleLogin = () => {
    tsvscode.postMessage({
      type: "authenticate",
      value: undefined,
    });
  };

  window.addEventListener("message", (event) => {
    const message = event.data;

    if (message.type === "token") {
      const accessToken = message.value;
      console.log("in signup function on message kistener", accessToken);
      signInWithCustomToken(auth, accessToken)
        .then(async (data) => {
          console.log("data", data);
          const { idToken } = data._tokenResponse;
          console.log("idToken bitch", idToken);

          tsvscode.postMessage({
            type: "setIdToken",
            value: idToken,
          });

          const docRef = doc(db, "users", data.user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("git the fucking user", data);
            // setUser({ user: { ...data } });
          } else {
            console.log("No such document");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log({ errorCode, errorMessage });
        });
    }
  });

  return (
    <div>
      <button onClick={handleLogin}>signd in</button>
    </div>
  );
};
