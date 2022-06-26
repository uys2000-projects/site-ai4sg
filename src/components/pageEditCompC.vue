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
  <div>
    <q-btn
      class="full-width bg-black text-white"
      label="Push Type To Serve"
      :disable="di"
      @click="clikEvent"
    />
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { updatePageType } from "@/services/service-fb";
export default {
  props: ["pages"],
  data() {
    return {
      route: computed(() => this.$route.params.name),
      di: false,
      page: {
        name: "",
        type: "",
        id: "",
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
    clikEvent: function () {
      this.di = true;
      updatePageType(this.page?.id, this.page?.type).then(
        () => (this.di = false)
      );
    },
    updatePage: function () {
      const a = this.pages?.find((i) => i.name == this.$route.params.name);
      this.page = a;
    },
    updateUrlType: function () {
      if (this.$route.params.type)
        if (this.$route.params.type != this.page?.type)
          this.$router.push(`/ap/pageCreate//${this.page?.name}}`);
    },
    updateUrlText: function () {
      if (this.$route.params.type)
        if (this.$route.params.name != this.page?.name && this.page?.name != "")
          this.$router.push(`/ap/pageCreate//${this.page?.name}}`);
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
