<template>
  <div v-if="show" class="device-notification">
    <p class="device-notification--message">
      Wow Woow Wooow Cihazının Boyutları Pek de Uygun Sayılmaz Web Sitemiz İçin
      Amma İstersen Hala Devam Edebilirsin
    </p>

    <q-btn @click="show = false" label="Devam" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
};
</script>
<style scoped>
img {
  max-width: 50%;
  margin: auto;
}
</style>
