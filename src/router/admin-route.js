export default {
  path: "/ap",
  name: "adminPanel",
  component: () => import("@/layouts/adminLayout.vue"),
  children: [
    {
      path: "",
      name: "adminIndex",
      component: () => import("@/pages/apIndexPage.vue"),
    },
    {
      path: "pageEdit/",
      name: "pages",
      component: () => import("@/pages/editPage.vue"),
      children: [
        {
          path: ":type/:id",
          name: "editPage",
          component: () => import("@/pages/editPage.vue"),
        },
      ],
    },
    {
      path: "pageCreate/",
      name: "pageCreate",
      component: () => import("@/pages/createPage.vue"),
      children: [
        {
          path: ":id",
          name: "pageEdit",
          component: () => import("@/components/pageEditComp.vue"),
        },
      ],
    },
    {
      path: "settings",
      name: "settings",
      component: () => import("@/pages/apIndexPage.vue"),
    },
  ],
};
