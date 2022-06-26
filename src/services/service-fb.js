import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import { arrayRemove, arrayUnion, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getPages = function () {
  const docRef = doc(db, "general", "pages");
  return getDoc(docRef);
};

export const addPage = function (page) {
  const docRef = doc(db, "general", "pages");
  return updateDoc(docRef, {
    regions: arrayUnion(page),
  }).catch(() => {
    return setDoc(docRef, [page]);
  });
};

export const removePage = function (page) {
  const docRef = doc(db, "general", "pages");
  return updateDoc(docRef, {
    regions: arrayRemove(page),
  });
};
