<template>
  <div>{{text}}</div>
</template>

<script>
import { getPostsMedium, updatePosts } from "@/services/getBlogs.js";
export default {
  data(){
    return{
      text: "Updating..."
    }
  },
  mounted() {
    getPostsMedium().then((res) => {
      res.forEach((element) => {
        updatePosts(element).then(()=>{
          this.text = "Updated :)"
        })
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
