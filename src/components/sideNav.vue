<template>
  <nav class="l-side-nav">
    <ul class="side-nav">
      <li class="is-active">
        <span>{{ f }}</span>
      </li>

      <li v-for="page in menu" :key="page">
        <span>{{ page }}</span>
      </li>
    </ul>
  </nav>
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
    const pages = this.getPages.value;
    this.f = pages[0];
    this.menu = pages.splice(1, pages.length - 1);
  },
};
</script>
