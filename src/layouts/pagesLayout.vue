<template>
  <ul class="l-main-content main-content ql-snow">
    <li class="l-section section ql-editor section--is-active ">
        <one-page v-if="f?.type == 'OneText'" :inf="f" />
        <many-page v-if="f?.type == 'ManyPage'" :inf="f" />
        <insta-page v-if="f?.type == 'InstaPage'" :inf="f" />
        <medium-page v-if="f?.type == 'MediumPage'" :inf="f" />
    </li>
    <li class="l-section section ql-editor"  v-for="page in menu" :key="page">
        <one-page v-if="page?.type == 'OneText'" :inf="page" />
        <many-page v-if="page?.type == 'ManyText'" :inf="page" />
        <insta-page v-if="page?.type == 'InstaPage'" :inf="page" />
        <medium-page v-if="page?.type == 'MediumPage'" :inf="page" />
    </li>
  </ul>
</template>
<script>
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import onePage from "@/pages/user/oneTextPage.vue";
import manyPage from "@/pages/user/manyTextPage.vue";
import instaPage from "@/pages/user/instaPage.vue";
import mediumPage from "@/pages/user/mediumPage.vue";

onePage;
manyPage;
instaPage;
mediumPage;
export default {
  props: ["pages"],
  inject: ["incDone"],
  components: {
    onePage,
    manyPage,
    instaPage,
    mediumPage,
  },
  data() {
    return {
      f: {},
      menu: [],
    };
  },
  watch: {
    pages() {
      const pages = [...this.pages];
      this.f = pages[0];
      this.menu = pages.splice(1, pages.length - 1);
      this.incDone();
    },
  },
};
</script>
