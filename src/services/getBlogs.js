import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
const firebaseConfig = {};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const get_posts = function () {
  const medium = require("@giuseppecampanelli/medium-api");
  medium.profile.getRecentPosts("aiforsg").then((res) => {
    console.log(res);
  });
};

export const update_posts = function (data) {
  const blogsRef = doc(db, "db", "blogs");
  return updateDoc(blogsRef, {
    blogs: arrayUnion(data),
  });
};
