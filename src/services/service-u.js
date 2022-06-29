import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import { getAnalytics, logEvent } from "firebase/analytics";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import {
  getStorage,
} from "firebase/storage";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
const analytics = getAnalytics(app);
logEvent(analytics, 'notification_received');

db
storage


export const getPages = function () {
  const colRef = collection(db, "pages");
  const q = query(colRef, orderBy("timestamp"));
  return getDocs(q);
};
export const getText = function (id) {
  const docRef = doc(db, "texts", id);
  return getDoc(docRef).catch((err) => console.log(err));
};
export const getInnerPages = function (id) {
  const colRef = collection(db, id);
  const q = query(colRef, orderBy("timestamp"));
  return getDocs(q);
};