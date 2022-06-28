<template>
  <nav class="l-side-nav">
    <ul class="side-nav">
      <li class="is-active">
        <span>{{ f.name }}</span>
      </li>

      <li v-for="page in menu" :key="page">
        <span>{{ page.name }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["pages"],
  inject:["incDone"],
  data() {
    return {
      f: " ",
      menu: [],
    };
  },
  mounted() {},
  watch: {
    pages() {
      const pages = [...this.pages];
      this.f = pages[0];
      this.menu = pages.splice(1, pages.length - 1);
      this.incDone()
    },
  },
};
</script>
