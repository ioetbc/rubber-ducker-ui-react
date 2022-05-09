// const checkUser = async () => {
//   tsvscode.postMessage({ type: "getToken", value: undefined });
//   window.addEventListener("message", async (event) => {
//     const message = event.data;

//     if (message.type !== "token") return;

//     const accessToken = message.value;

//     const bar = httpsCallable(functions, "bar");
//     const result = await bar({ accessToken });
//     console.log("is the user logged in?", result);
//   });
// };

// const getAllUsers = async () => {
//   const collectionRef = collection(db, "users");
//   try {
//     const userSnapshot = await getDocs(collectionRef);
//     userSnapshot.docs.forEach((doc) => {
//       setUsers((users) => [...users, { ...doc.data(), id: doc.id }]);
//     });
//   } catch (error) {
//     setErrorMessage(error.toString());
//   }
// };

{
  /* <button onClick={checkUser}>check user is authenticated</button> */
}
{
  /* <button onClick={getAllUsers}>get all users</button> */
}
