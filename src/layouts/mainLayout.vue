<template>
  <div class="perspective effect-rotate-left">
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
import headerBar from "@/components/headerBar.vue";
import sideNav from "@/components/sideNav.vue";
import popupNav from "@/components/popupNav.vue";
import deviceNotification from "@/components/deviceNotification.vue";
import { getPages } from "@/services/service-u";
export default {
  components: { headerBar, sideNav, pagesLayout, popupNav, deviceNotification },
  data() {
    return {
      pages: [],
      done: 0,
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
    import("@/assets/css/main.css");
    this.setPages();
  },
  watch: {
    done() {
      if (this.done >= 3) import("@/assets/js/functions-min");
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
