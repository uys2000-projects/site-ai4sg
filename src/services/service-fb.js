import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
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
  return getDocs(colRef);
};
const uploadPage = function (page) {
  const colRef = collection(db, "pages");
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
const remPageWithId = function (id) {
  const docRef = doc(db, "pages", id);
  return deleteDoc(docRef);
};

export const removePage = function (page) {
  return remPageWithId(page.id);
};

export const getManyPages = function (id) {
  const colRef = collection(db, id);
  return getDocs(colRef);
};
const uploadInnerPage = function (outterId, page) {
  const colRef = collection(db, outterId);
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

export const updatePageType = function (id, pageType) {
  const docRef = doc(db, "pages", id);
  return updateDoc(docRef, { type: pageType });
};

export const upladImage = function (file, id) {
  const storageRef = ref(storage, "images/" + id);
  listAll(storageRef)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  file;
  return uploadBytesResumable;
};

export const donwloadImage = function (name, id) {
  const storageRef = ref(storage, "images/" + id + "/" + name);
  return getDownloadURL(storageRef);
};
