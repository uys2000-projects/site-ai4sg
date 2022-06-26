import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "./config";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const sign = function (email, pass) {
  return signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
