<template>
  <router-view :pages="pages" />
</template>

<script>
export default {
  props: ["pages"],
};
</script>

<style scoped></style>
