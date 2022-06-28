<template>
  <div v-show="show" class="perspective effect-rotate-left">
    <div class="container">
      <div class="outer-nav--return"></div>
      <div id="viewport" class="l-viewport">
        <div class="l-wrapper">
          <header-bar />
          <side-nav :pages="pages" />
          <pages-layout :pages="pages" />
        </div>
      </div>
    </div>
    <popup-nav :pages="pages" />
  </div>
  <device-notification />
</template>

<script>
import pagesLayout from "@/layouts/pagesLayout.vue";
import headerBar from "@/components/user/headerBar.vue";
import sideNav from "@/components/user/sideNav.vue";
import popupNav from "@/components/user/popupNav.vue";
import deviceNotification from "@/components/user/deviceNotification.vue";
import { getPages } from "@/services/service-u";
export default {
  components: { headerBar, sideNav, pagesLayout, popupNav, deviceNotification },
  data() {
    return {
      pages: [],
      done: 0,
      show: false,
    };
  },
  methods: {
    setPages: function () {
      getPages().then((res) => {
        this.pages = res.docs.map((i) => i.data());
        console.log(this.pages);
      });
    },
  },
  provide() {
    return {
      incDone: () => this.done++,
    };
  },
  mounted() {
    this.setPages();
  },
  watch: {
    done() {
      // this about geting pages from database
      if (this.done >= 3) {
        import("@/assets/js/functions-min").then(() => {
          import("@/assets/css/main.css").then(() => {
            setTimeout(() => {
              this.show = true;
            }, 100);
          });
        });
      }
    },
  },
};
</script>

<style>
.sc::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.sc::-webkit-scrollbar-track {
  background-color: #111;
  border-radius: 10px;
}
.sc::-webkit-scrollbar-thumb {
  background-color: #222;
  border-radius: 10px;
}
</style>
