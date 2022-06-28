<template>
  <ul class="outer-nav text-right">
    <li class="text-right is-active">{{ f.name }}</li>
    <li class="text-right" v-for="page in menu" :key="page">{{ page.name }}</li>
  </ul>
</template>
<script>
export default {
  props: ["pages"],
  inject: ["incDone"],
  data() {
    return {
      f: " ",
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
