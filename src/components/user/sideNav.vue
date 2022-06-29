<template>
  <nav class="l-side-nav">
    <ul class="side-nav" ref="ul">
      <li v-for="page in menu" :key="page">
        <span>{{ page.name }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["pages"],
  inject: ["incDone", "pageIndex"],
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    setActivePage: function () {
      this.$refs.ul.children[this.pageIndex].classList.add("is-active");
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
