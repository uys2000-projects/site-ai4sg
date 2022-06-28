<template>
  <div class="p ss">
    <page-create :pages="pages" />
  </div>
  <div class="p ss">

  <router-view :pages="pages" />
  </div>
</template>

<script>
import pageCreate from "../../components/admin/pageCreate.vue";
export default {
  props: ["pages"],
  components: {
    pageCreate,
  },
};
</script>

<style scoped></style>
