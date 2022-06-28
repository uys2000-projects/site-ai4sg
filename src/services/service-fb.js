import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  listAll,
  uploadBytes,
} from "firebase/storage";
export const c = function (ret, text) {
  console.log(text);
  return ret;
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

export const getPages = function () {
  const colRef = collection(db, "pages");
  const q = query(colRef, orderBy("timestamp"));
  return getDocs(q);
};
const uploadPage = function (page) {
  const colRef = collection(db, "pages");
  page.timestamp = new Date().getTime();
  return addDoc(colRef, page).then((res) => res.id);
};
const updatePage = function (id, page) {
  const docRef = doc(db, "pages", id);
  return updateDoc(docRef, page).then(() => page);
};
export const createPage = function (page) {
  return uploadPage(page).then((id) => {
    page["id"] = id;
    return updatePage(id, page);
  });
};

export const removePage = function (id) {
  const docRef = doc(db, "pages", id);
  return deleteDoc(docRef);
};

export const getManyPages = function (id) {
  const colRef = collection(db, id);
  const q = query(colRef, orderBy("timestamp"));
  return getDocs(q);
};
const uploadInnerPage = function (outterId, page) {
  const colRef = collection(db, outterId);
  page.timestamp = new Date().getTime()
  return addDoc(colRef, page).then((res) => res.id);
};
const updateInnerPage = function (outterId, id, page) {
  const docRef = doc(db, outterId, id);
  return updateDoc(docRef, page).then(() => page);
};
export const createInnerPage = function (outterId, page) {
  return uploadInnerPage(outterId, page).then((id) => {
    page["id"] = id;
    return updateInnerPage(outterId, id, page);
  });
};

export const removeInnerPage = function (outterId, innerId) {
  const docRef = doc(db, outterId, innerId);
  return deleteDoc(docRef);
};
export const updatePageType = function (id, pageType, pageName) {
  const docRef = doc(db, "pages", id);
  return updateDoc(docRef, { type: pageType, name: pageName });
};
const getID = function () {
  const a = window.location.pathname.split("/");
  return a[a.length - 1];
};
const listFiles = function (id) {
  const listRef = ref(storage, "imgs/" + id);
  return listAll(listRef).then((res) => res.items.length);
};
export const upladImage = function (file) {
  file;
  const id = getID();
  return listFiles(id).then((i) => {
    const storageRef = ref(storage, `imgs/${id}/img${i}`);
    return uploadBytes(storageRef, file).then(
      () => `/fireTarget-imgs/${id}/img${i}`
    );
  });
};

export const getImage = function (url) {
  const storageRef = ref(storage, url);
  return getDownloadURL(storageRef);
};

export const uploadText = function (text) {
  const id = getID();
  const docRef = doc(db, "texts", id);
  return setDoc(docRef, { text: text });
};

export const getText = function () {
  const id = getID();
  const docRef = doc(db, "texts", id);
  return getDoc(docRef).catch((err) => console.log(err));
};
