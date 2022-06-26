<template>Redirecting...</template>
<script>
export default {
  mounted() {
    const a = this.$route.path.split("/").find((i) => i == "ap");
    if (a == "ap") this.$router.push("/ap");
    else this.$router.push({ name: "Index" });
  },
};
</script>
