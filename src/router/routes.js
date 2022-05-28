export default [
  {
    path: "/",
    name: "Index",
    component: () => import("@/layouts/mainLayout.vue"),
  },
  {
    path: "/",
    params: ["refresh"],
    name: "IndexRefreshed",
    component: () => import("@/layouts/mainLayout.vue"),
  },
  {
    path: "/updateBlogs",
    name: "UpdateBlogs",
    component: () => import("@/update/updateBlogs.vue"),
  },
  {
    path: "/updateMedias",
    name: "UpdateMedia",
    component: () => import("@/update/updateMedias.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Error",
    component: () => import("@/layouts/redirectLayout.vue"),
  },
];
