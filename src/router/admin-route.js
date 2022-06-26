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
          path: ":type/:name/:id",
          name: "editPage",
          component: () => import("@/pages/editorPage.vue"),
          children: [
            {
              path: "ip/:iid",
              name: "editPage",
              component: () => import("@/pages/editorPage.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "pageCreate/",
      name: "pageCreate",
      component: () => import("@/pages/createPage.vue"),
      children: [
        {
          path: ":name",
          name: "pageEdit",
          component: () => import("@/components/pageEditCompC.vue"),
        },
      ],
    },
    {
      path: "settings",
      name: "settings",
      component: () => import("@/pages/apIndexPage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "Error",
      component: () => import("@/layouts/redirectLayout.vue"),
    },
  ],
};
