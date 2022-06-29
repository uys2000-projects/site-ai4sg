<template>
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
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  props: ["pages"],
  data() {
    return {
      route: computed(() => this.$route.params.name),
      page: {
        name: "",
        type: "",
      },
      options: [
        { label: "OneText", value: "OneText" },
        { label: "ManyText", value: "ManyText" },
      ],
    };
  },
  methods: {
    updatePage: function () {
      const a = this.pages?.find((i) => i.id == this.$route.params.id);
      this.page = a;
    },
    updateUrlType: function () {
      if (this.$route.params.type)
        if (this.$route.params.type != this.page?.type)
          this.$router.push(
            `/ap/pageEdit/${this.page?.type}/${this.page?.name}/${this.page?.id}`
          );
    },
    updateUrlText: function () {
      if (this.$route.params.type)
        if (this.$route.params.name != this.page?.name && this.page?.name != "")
          this.$router.push(
            `/ap/pageEdit/${this.page?.type}/${this.page?.name}/${this.page?.id}`
          );
        else {
          null;
        }
      else if (
        this.$route.params.name != this.page?.name &&
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
