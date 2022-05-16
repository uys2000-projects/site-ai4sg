<template>
  <router-view />
</template>

<script>
import { get_posts } from "@/services/getBlogs";
export default {
  name: "App",
  mounted() {
    get_posts();
  },
};
</script>
