<template>
  <div class="p ss">
    <q-input
      v-model="page.name"
      @update:model-value="updateUrlText"
      label="Page Name"
    />
    <div>
      <span>Page Type :</span>
      <q-option-group
        v-model="page.type"
        :options="options"
        color="primary"
        @update:model-value="updateUrlType"
      />
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  props: ["pages"],
  data() {
    return {
      route: computed(() => this.$route.params.id),
      page: {
        name: "",
        type: "",
      },
      options: [
        { label: "OneText", value: "OneText" },
        { label: "ManyText", value: "ManyText" },
        { label: "InstaPosts", value: "InstaPosts" },
        { label: "MediumPosts", value: "MediumPosts" },
      ],
    };
  },
  methods: {
    updatePage: function () {
      const a = this.pages?.find((i) => i.name == this.$route.params.id);
      console.log(a);
      this.page = a;
    },
    updateUrlType: function () {
      if (this.$route.params.type)
        if (this.$route.params.type != this.page?.type)
          this.$router.push(
            `/ap/pageEdit/${this.page?.type}/${this.page?.name}`
          );
    },
    updateUrlText: function () {
      if (this.$route.params.type)
        if (this.$route.params.id != this.page?.name && this.page?.name != "")
          this.$router.push(
            `/ap/pageEdit/${this.page?.type}/${this.page?.name}`
          );
        else {
          null;
        }
      else if (
        this.$route.params.id != this.page?.name &&
        this.page?.name != ""
      )
        this.$router.push(`/ap/pageCreate/${this.page?.name}`);
    },
  },
  mounted() {
    this.updatePage();
  },
  watch: {
    route() {
      this.updatePage();
    },
  },
};
</script>
