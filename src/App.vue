<template>
  <router-view />
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  name: "App",
  data() {
    return {
      pages: ["AnaSayfa", "Hakkımızda", "Etkinlikler", "Yazılar", "İletişim"],
    };
  },
  provide() {
    return {
      getPages: computed(() => this.pages),
    };
  },
};
</script>
