import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  setDoc,
  startAt,
} from "firebase/firestore";
import { doc, startAfter, limit, query } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBIeENAMOxIA2QzYesb07BnX7n4EjJCYiU",
  authDomain: "ai4sg-test2.firebaseapp.com",
  projectId: "ai4sg-test2",
  storageBucket: "ai4sg-test2.appspot.com",
  messagingSenderId: "806629047089",
  appId: "1:806629047089:web:e749d2518a21baaebb4e10",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getPostsMedium = function () {
  const medium = require("@giuseppecampanelli/medium-api");
  return medium.profile.getRecentPosts("aiforsg").then((res) => {
    return res;
  });
};

const getTime = function (t) {
  const [date, time] = t.split(" ");
  const [year, month, day] = date.split("-");
  const [hours, minutes, seconds] = time.split(":");
  const timeStamp = new Date(year, month, day, hours, minutes, seconds);
  return timeStamp.getTime();
};
export const updatePosts = function (data) {
  data["timeStamp"] = getTime(data.pubDate);
  const blogRef = doc(db, "posts", `${data["timeStamp"]}`);
  return setDoc(blogRef, data);
};

export const getPostsDB = function (lenght) {
  const q = query(collection(db, "posts"), limit(lenght));
  return getDocs(q);
};

export const getPostsN = function (start, lenght) {
  const q = query(
    collection(db, "posts"),
    orderBy("timeStamp"),
    startAfter(start.timeStamp),
    limit(lenght)
  );
  return getDocs(q);
};
export const getPostsB = function (start, lenght) {
  const q = query(
    collection(db, "posts"),
    orderBy("timeStamp", "desc"),
    limit(lenght)
  );
  return getDocs(q);
};
const t =
  "IGQVJWMlVDdmRrQi1sRGFsUFhHWTV3ejBnQ2twU2RiNTNKRVU2VEQzeVQwSGF0bG1UbmxlR1JVUjhpajZAQY1kxcDQ5WG9JWjMzQWl1cUZA1S0dNbHBBMlQtNXBDdWk4NXF3UUlHbUlJT1RUUVZAEZAUFMOAZDZD";
const u =
  "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,timestamp&access_token=";
export const getPostsInsta = function (url = u, token = t, r = []) {
  return fetch(url + token, {}).then((res) => {
    return res.json().then((re) => {
      if (re.paging.next) {
        return getPostsInsta(re.paging.next, "", r.concat(re.data));
        // return r.concat(re.data);
      } else return r.concat(re.data);
    });
  });
};
const getTime2 = function (t) {
  const [date, time] = t.split("T");
  const [year, month, day] = date.split("-");
  const time2 = time.split("+")[0];
  const [hours, minutes, seconds] = time2.split(":");
  const timeStamp = new Date(year, month, day, hours + 3, minutes, seconds);
  return timeStamp.getTime();
};
export const updateMedias = function (data) {
  data["timeStamp"] = getTime2(data.timestamp);
  const mediaRef = doc(db, "medias", `${data["timeStamp"]}`);
  return setDoc(mediaRef, data);
};

export const getPost = function (dName) {
  const q = query(
    collection(db, dName),
    orderBy("timeStamp", "desc"),
    limit(1)
  );
  return getDocs(q);
};
export const getPosts = function (dName, startItem, lenght, f = false) {
  const q = query(
    collection(db, dName),
    orderBy("timeStamp", "desc"),
    f ? startAt(startItem.timeStamp) : startAfter(startItem.timeStamp),
    limit(lenght)
  );
  return getDocs(q);
};
