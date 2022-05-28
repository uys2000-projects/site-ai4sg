<template>
  <ul class="outer-nav">
    <li class="is-active">{{ f }}</li>
    <li v-for="page in menu" :key="page">{{ page }}</li>
  </ul>
</template>
<script>
export default {
  inject: ["getPages"],
  data() {
    return {
      f: " ",
      menu: [],
    };
  },
  mounted() {
    const pages = [...this.getPages];
    this.f = pages[0];
    this.menu = pages.splice(1, pages.length - 1);
  },
};
</script>
