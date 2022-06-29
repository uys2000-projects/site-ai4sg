<template>
  <ul class="outer-nav" ref="ul">
    <li v-for="page in menu" :key="page">{{ page.name }}</li>
  </ul>
</template>
<script>
export default {
  props: ["pages"],
  inject: ["incDone", "setPageIndex", "pageIndex"],
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    setPageIndexLong: function (hash) {
      const hashIndex = [...this.$refs.ul.children].findIndex(
        (i) => i.innerHTML == hash
      );
      if (hashIndex) this.setPageIndex(hashIndex);
    },
    setPageIndexShort: function (hash) {
      try {
        const h = parseInt(hash);
        if (h <= this.pages.length) this.setPageIndex(h);
      } catch (e) {
        console.log(e);
      }
    },
    setPageIndexMethod: function () {
      let hash = this.$route.hash.replace("#", "");
      if (hash.length == 1) this.setPageIndexShort(hash);
      if (hash.length > 1) this.setPageIndexLong(hash);
    },
    setActivePage: function () {
      this.setPageIndexMethod();
      this.$refs.ul.children[this.pageIndex].classList.add("is-active");
    },
  },
  watch: {
    pages() {
      this.menu = [...this.pages];
      setTimeout(() => {
        this.setActivePage();
        this.incDone();
      }, 10);
    },
  },
};
</script>

<style scoped>
@media (max-width: 1080px) {
  .outer-nav {
    right: 5px !important;
    left: unset;
    text-align: right;
  }
}
</style>
