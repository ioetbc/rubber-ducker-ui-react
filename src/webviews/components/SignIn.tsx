import React from "react";
import { db, auth } from "../../firebaseApp";
import { signInWithCustomToken } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const SignIn = () => {
  const handleLogin = () => {
    tsvscode.postMessage({
      type: "authenticate",
      value: undefined,
    });
  };

  window.addEventListener("message", async (event) => {
    const message = event.data;

    if (message.type === "token") {
      const accessToken = message.value;
      signInWithCustomToken(auth, accessToken)
        .then(async (userCredential) => {
          const docRef = doc(db, "users", userCredential.user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
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
