<template>
  <div class="l">
    <img :src="require('@/assets/dişi_yatay_uzun.png')" alt="" />
    <div>
      <q-form class="text-white fadein" @submit="login">
        <q-input dark v-model="mail" label="E-Mail" />
        <q-input dark v-model="pass" label="Pass" />
        <q-btn flat label="login" class="full-width text-white" type="submit" @click="login" />
      </q-form>
    </div>
  </div>
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

<style scoped>
img {
  width: 100%;
}
.l {
  position: fixed;
  width: 100%;
  max-width: 500px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0px;
}
.l > div {
  background-color: #111;
  padding: 10px;
  border-radius: 10px;
}
</style>
