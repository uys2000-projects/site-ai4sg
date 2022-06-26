<template>
  <q-expansion-item
    expand-separator
    icon="auto_stories"
    :caption="`Pages: ${pages?.length}`"
    label="Pages"
  >
    <q-list dark>
      <list-item-pages
        v-for="page in pages"
        :key="page"
        icon="description"
        :text="page?.name"
        :text2="page?.type"
        :goTo="() => $router.push(`/ap/pageCreate/${page?.name}`)"
        @click="name = page.name"
      />
    </q-list>
  </q-expansion-item>
  <q-input v-model="name" label="Page Name" />
  <q-btn
    class="full-width bg-primary text-white"
    label="Create / Delete Page"
    :disable="btn"
    @click="clickEvent"
  />
</template>

<script>
import listItemPages from "@/components/listItemPages.vue";
export default {
  props: ["pages"],
  inject: ["updatePages"],
  components: {
    listItemPages,
  },
  data() {
    return {
      btn: false,
      name: "",
    };
  },
  methods: {
    clickEvent: function () {
      this.btn = true;
      this.updatePages(this.name).then(() => (this.btn = false));
    },
  },
};
</script>
