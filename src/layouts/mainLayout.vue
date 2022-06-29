<template>
  <q-circular-progress
    v-if="!show"
    indeterminate
    size="50px"
    color="white"
    class="loading"
  />

  <transition-group
    name="shower"
    tag="div"
    v-show="show"
    :class="{ fadein: show }"
    class="perspective effect-rotate-left"
  >
    <div class="container" key="c">
      <div class="outer-nav--return"></div>
      <div id="viewport" class="l-viewport">
        <div class="l-wrapper">
          <header-bar />
          <side-nav :pages="pages" />
          <pages-layout :pages="pages" />
        </div>
      </div>
    </div>
    <popup-nav :pages="pages" key="p" />
    <device-notification key="n" />
  </transition-group>
</template>

<script>
import pagesLayout from "@/layouts/pagesLayout.vue";
import headerBar from "@/components/user/headerBar.vue";
import sideNav from "@/components/user/sideNav.vue";
import popupNav from "@/components/user/popupNav.vue";
import deviceNotification from "@/components/user/deviceNotification.vue";
import { getPages } from "@/services/service-u";
import { computed } from "@vue/runtime-core";
export default {
  components: { headerBar, sideNav, pagesLayout, popupNav, deviceNotification },
  data() {
    return {
      pages: [],
      pageIndex: 0,
      done: 0,
      show: false,
    };
  },
  methods: {
    getPages: function () {
      getPages().then((res) => {
        this.pages = res.docs.map((i) => i.data());
      });
    },
    setWebPage: function () {
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
    setPage: function () {},
  },
  provide() {
    return {
      setPageIndex: (value) => (this.pageIndex = value),
      pageIndex: computed(() => this.pageIndex),
      done: computed(() => this.done),
      incDone: () => this.done++,
    };
  },
  mounted() {
    this.getPages();
  },
  watch: {
    done() {
      this.setWebPage();
    },
  },
};

//$(".side-nav li, .outer-nav li").click(function () {
//  if (!$(this).hasClass("is-active")) {
//    var $this = $(this),
//      curActive = $this.parent().find(".is-active"),
//      curPos = $this.parent().children().index(curActive),
//      nextPos = $this.parent().children().index($this),
//      lastItem = $(this).parent().children().length - 1;
//
//    updateNavs(nextPos);
//    updateContent(curPos, nextPos, lastItem);
//  }
//});
//
//$(".cta").click(function () {
//  var curActive = $(".side-nav").find(".is-active"),
//    curPos = $(".side-nav").children().index(curActive),
//    lastItem = $(".side-nav").children().length - 1,
//    nextPos = lastItem;
//
//  updateNavs(lastItem);
//  updateContent(curPos, nextPos, lastItem);
//});
</script>

<style scoped>
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.list-enter-active,
.list-leave-active {
  animation-name: fadein;
  animation-duration: 6s;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
.list-enter-from,
.list-leave-to {
  animation-name: fadein;
  animation-duration: 6s;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
</style>
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
