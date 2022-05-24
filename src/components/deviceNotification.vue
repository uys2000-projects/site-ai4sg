<template>
  <div v-if="show" class="device-notification">
    <a class="device-notification--logo text-center" href="#0">
      <img :src="require('@/assets/logo.png')" alt="AI4SG" />
    </a>
    <p class="device-notification--message">
      AI4SG has so much to offer that we must request you orient your device to
      portrait or find a larger screen. You won't be disappointed.
    </p>

    <q-btn @click="show = false" label="Contiune" />
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
