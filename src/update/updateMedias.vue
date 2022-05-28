<template>asd</template>

<script>
import { getPostsInsta, updateMedias } from "@/services/getBlogs.js";
export default {
  mounted() {
    getPostsInsta().then((res) => {
      res.forEach((element) => {
        updateMedias(element);
      });
    });
  },
};
</script>
