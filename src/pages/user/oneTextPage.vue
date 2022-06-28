<template>
  <div class="sc" v-html="html"></div>
</template>
<script>
import { getText } from "@/services/service-u";
export default {
  props: ["inf"],
  data() {
    return {
      html: "",
    };
  },
  mounted() {
    getText(this.inf.id).then((res) => {
      this.html = res.data().text;
    });
  },
};
</script>
