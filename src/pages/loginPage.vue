<template>
  <q-form action="https://some-url.com" method="post" class="text-white">
    <q-input dark v-model="mail" label="E-Mail" />
    <q-input dark v-model="pass" label="Pass" />
    <q-btn label="login" style="width: 100vw" @click="login" />
  </q-form>
</template>

<script>
import { sign } from "@/services/login-service";
export default {
  data() {
    return {
      mail: "",
      pass: "",
    };
  },
  methods: {
    login: function () {
      sign(this.mail, this.pass)
        .then((user) => {
          console.log(user);
          import("@/router/admin-route").then((res) => {
            this.$router.removeRoute("Error");
            this.$router.removeRoute("adminLogin");
            this.$router.addRoute(res.default);
            this.$router.push("/ap");
            this.$router.addRoute({
              path: "/:pathMatch(.*)*",
              name: "Error",
              component: () => import("@/layouts/redirectLayout.vue"),
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
