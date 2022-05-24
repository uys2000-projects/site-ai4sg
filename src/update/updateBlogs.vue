<template>
  <div>asd</div>
</template>

<script>
import { get_posts } from "@/services/getBlogs.js";
export default {
  mounted() {
    get_posts();
  },
};
</script>

<style scoped>
* {
  color: white;
}
</style>
