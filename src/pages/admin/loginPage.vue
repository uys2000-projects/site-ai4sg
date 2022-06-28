<template>
  <q-form class="text-white">
    <q-input dark v-model="mail" label="E-Mail" />
    <q-input dark v-model="pass" label="Pass" />
    <q-btn label="login" style="width: 100vw" @click="login" />
  </q-form>
</template>

<script>
import { auth, sign } from "@/services/login-service";
export default {
  data() {
    return {
      mail: "",
      pass: "",
    };
  },
  methods: {
    signEvent: function () {
      localStorage.setItem("m", this.mail);
      localStorage.setItem("p", this.pass);
      import("@/router/admin-route").then((res) => {
        this.$router.removeRoute("Error");
        this.$router.removeRoute("adminLogin");
        this.$router.addRoute(res.default);
        this.$router.push("/ap");
      });
    },
    login: function () {
      sign(this.mail, this.pass)
        .then((res) => {
          if (res) this.signEvent();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    import("@/assets/css/main.css");
    this.mail = localStorage.getItem("m");
    this.pass = localStorage.getItem("p");
    if (auth.currentUser != null) {
      this.signEvent();
    }
  },
};
</script>
