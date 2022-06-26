<template>
  <q-list dark class="rounded-borders text-left">
    <list-item
      icon="home"
      text="Admin Panel"
      :goTo="() => $router.push('/ap')"
    />

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
          :goTo="() => $router.push(`/ap/pageEdit/${page?.type}/${page?.name}`)"
        />
      </q-list>
    </q-expansion-item>
    <list-item
      icon="note_add"
      text="Create Page"
      :goTo="() => $router.push('/ap/pageCreate')"
    />
    <list-item
      icon="settings"
      text="Settings"
      :goTo="() => $router.push('/ap/settings')"
    />
    <list-item
      icon="logout"
      text="Exit"
      iconRight="chevron_left"
      :goTo="() => $router.push('/exit')"
    />
  </q-list>
</template>

<script>
import { getPages } from "@/services/service-fb";
import listItem from "./listItem.vue";
import listItemPages from "./listItemPages.vue";
export default {
  props: ["pages"],
  inject: ["setPages"],
  components: {
    listItem,
    listItemPages,
  },
  data() {
    return {};
  },
  mounted() {
    getPages().then((res) => {
      if (res.exists()) this.setPages(res.data());
    });
  },
};
</script>

<style scoped>
.q-btn {
  width: 100%;
}
</style>
