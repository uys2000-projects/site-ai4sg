<template>
  <div class="perspective effect-rotate-left">
    <div class="container">
      <div class="outer-nav--return"></div>
      <div id="viewport" class="l-viewport">
        <div class="l-wrapper">
          <header-bar />
          <side-nav />
          <pages-layout />
        </div>
      </div>
    </div>
    <popup-nav />
  </div>
  <device-notification />
</template>

<script>
import pagesLayout from "@/layouts/pagesLayout.vue";
import headerBar from "@/components/headerBar.vue";
import sideNav from "@/components/sideNav.vue";
import popupNav from "@/components/popupNav.vue";
import deviceNotification from "@/components/deviceNotification.vue";
export default {
  components: { headerBar, sideNav, pagesLayout, popupNav, deviceNotification },
  props: ["refresh"],
  mounted() {
    if (this.$route.params.refresh) location.reload()
    import("../../public/assets/js/functions-min");
  },
};
</script>
