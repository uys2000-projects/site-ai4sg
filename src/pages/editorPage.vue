<template>
  <template v-if="type == 'OneText'">
    <div class="p ss">
      <page-edit :pages="pages" />
    </div>
    <div class="p ss"></div>
  </template>
  <template v-if="type == 'ManyText'">
    <div class="p ss">
      <page-edit-plus :pages="pages" />
    </div>
    <div class="p ss"></div>
  </template>
  <template v-if="type == 'InstaPosts'">
    <div class="p ss">
      <page-edit :pages="pages" />
    </div>
    <div class="p ss"></div>
  </template>
  <template v-if="type == 'MediumPosts'">
    <div class="p ss">
      <page-edit :pages="pages" />
    </div>
    <div class="p ss"></div>
  </template>
</template>
<script>
import pageEdit from "../components/pageEditComp.vue";
import pageEditPlus from "../components/pageEditCompPlus.vue";
export default {
  props: ["pages"],
  components: { pageEdit, pageEditPlus },
  data() {
    return {
      type: "",
    };
  },
  methods: {
    getPageType: function () {
      return this.$route.path.split("/")[3];
    },
  },
  beforeMount() {
    this.type = this.getPageType();
  },
  beforeUpdate() {
    this.type = this.getPageType();
  },
};
</script>
