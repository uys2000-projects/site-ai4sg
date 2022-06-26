<template>
  <div class="p ss">
    <page-edit :pages="pages" />
  </div>
</template>

<script>
import pageEdit from "../components/pageEditComp.vue";
export default {
  props: ["pages"],
  components: {
    pageEdit,
  },
};
</script>

<style scoped></style>
