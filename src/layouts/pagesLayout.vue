<template>
  <ul class="l-main-content main-content ql-snow" ref="ul">
    <li class="l-section section ql-editor" v-for="page in menu" :key="page">
      <one-page v-if="page.type == 'OneText'" :inf="page" />
      <many-page v-if="page.type == 'ManyText'" :inf="page" />
    </li>
  </ul>
</template>
<script>
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import onePage from "@/pages/user/oneTextPage.vue";
import manyPage from "@/pages/user/manyTextPage.vue";
export default {
  props: ["pages"],
  inject: ["incDone", "pageIndex"],
  components: {
    onePage,
    manyPage,
  },
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    setActivePage: function () {
      this.$refs.ul.children[this.pageIndex].classList.add(
        "section--is-active"
      );
    },
  },
  watch: {
    pages() {
      this.menu = [...this.pages];
      setTimeout(() => {
        this.setActivePage();
        this.incDone();
      }, 20);
    },
  },
};
</script>
