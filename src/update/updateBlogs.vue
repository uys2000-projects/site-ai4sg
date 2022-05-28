<template>
  <div>Updated...</div>
</template>

<script>
import { getPostsMedium, updatePosts } from "@/services/getBlogs.js";
export default {
  mounted() {
    getPostsMedium().then((res) => {
      res.forEach((element) => {
        updatePosts(element);
      });
    });
  },
};
</script>

<style scoped>
* {
  color: white;
}
div {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
