<template>
  <div>{{ text }}</div>
</template>

<script>
import { getPostsInsta, updateMedias } from "@/services/getBlogs.js";
export default {
  data() {
    return {
      text: "Updating...",
    };
  },
  mounted() {
    getPostsInsta().then((res) => {
      res.forEach((element) => {
        updateMedias(element).then(() => {
          this.text = "Updated :)";
        });
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
