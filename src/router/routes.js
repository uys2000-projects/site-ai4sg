export default [
  {
    path: "/",
    name: "Index",
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
    path: "/ap",
    name: "adminLogin",
    component: () => import("@/pages/admin/loginPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Error",
    component: () => import("@/layouts/redirectLayout.vue"),
  },
];
