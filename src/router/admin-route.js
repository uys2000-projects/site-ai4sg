export default {
  path: "/ap",
  name: "adminPanel",
  component: () => import("@/layouts/adminLayout.vue"),
  children: [
    {
      path: "",
      name: "adminIndex",
      component: () => import("@/pages/admin/apIndexPage.vue"),
    },
    {
      path: "pageEdit/",
      name: "pages",
      component: () => import("@/pages/admin/editPage.vue"),
      children: [
        {
          path: ":type/:name/:id",
          name: "editPage",
          component: () => import("@/pages/admin/editorPage.vue"),
          children: [
            {
              path: "ip/:iid",
              name: "editPage",
              component: () => import("@/pages/admin/editorPage.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "pageCreate/",
      name: "pageCreate",
      component: () => import("@/pages/admin/createPage.vue"),
      children: [
        {
          path: ":name/:id",
          name: "pageEdit",
          component: () => import("@/components/admin/pageEditCompC.vue"),
        },
      ],
    },
    {
      path: "settings",
      name: "settings",
      component: () => import("@/pages/admin/apIndexPage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "Error",
      component: () => import("@/layouts/redirectLayout.vue"),
    },
  ],
};
