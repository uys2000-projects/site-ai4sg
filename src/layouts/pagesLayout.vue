<template>
  <ul class="l-main-content main-content">
    <li class="l-section section section--is-active">
      <home-page />
    </li>
    <li class="l-section section">
      <events-page />
    </li>
    <li class="l-section section">
      <about-page />
    </li>
    <li class="l-section section">
      <contact-page />
    </li>
  </ul>
</template>
<script>
import homePage from "@/pages/homePage.vue";
import eventsPage from "@/pages/eventsPage.vue";
import aboutPage from "@/pages/aboutPage.vue";
import contactPage from "@/pages/contactPage.vue";
export default {
  components: {
    homePage,
    eventsPage,
    aboutPage,
    contactPage,
  },
};
</script>
