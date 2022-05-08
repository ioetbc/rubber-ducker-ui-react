import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebaseApp";
import { signInWithCustomToken } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default class ProviderMessages {
  callRubberDuckerProvider({ type, value }) {
    tsvscode.postMessage({ type, value });
  }

  loginUser() {
    this.callRubberDuckerProvider({ type: "authenticate", value: undefined });
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

            this.callRubberDuckerProvider({
              type: "setIdToken",
              value: idToken,
            });

            const docRef = doc(db, "users", data.user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const data = docSnap.data();
              console.log("user has been signed in", data);
              return data;
            } else {
              console.log("No such document");
            }
          })
          .catch((error) => {
            const { code, message, details } = error;
            console.log({ code, message, details });
          });
      }
    });
  }

  async refreshToken() {
    this.callRubberDuckerProvider({ type: "getIdToken", value: undefined });
  }
}
