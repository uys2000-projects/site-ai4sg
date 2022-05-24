<template>Redirecting...</template>
<script>
export default {
  mounted() {
    this.$router.push({ name: 'IndexRefreshed', params: { refresh: true } })
  },
};
</script>
