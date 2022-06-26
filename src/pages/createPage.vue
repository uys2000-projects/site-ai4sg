<template>
  <div class="p ss">
    <page-create :pages="pages" />
  </div>
  <router-view :pages="pages" />
</template>

<script>
import pageCreate from "../components/pageCreate.vue";
export default {
  props: ["pages"],
  components: {
    pageCreate,
  },
};
</script>

<style scoped></style>
