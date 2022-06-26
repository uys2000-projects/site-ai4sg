<template>
  <div class="a row wrap">
    <div class="p b">
      <pages-nav :pages="pages" />
    </div>
    <router-view :pages="pages" />
  </div>
  {{ pages }}
</template>

<script>
import pagesNav from "@/components/apPagesNav.vue";

export default {
  components: {
    pagesNav,
  },
  data() {
    return {
      pages: [],
    };
  },
  methods: {
    updatePages: function (page) {
      if (page != "")
        if (this.pages.find((i) => i.name == page))
          this.pages = this.pages.filter((i) => i.name != page);
        else {
          this.pages.push({ name: page, type: "OneText" });
          this.$router.push(`/ap/pageCreate/${page}`);
        }
    },
  },
  provide() {
    return {
      setPages: (pages) => (this.pages = pages),
      updatePages: this.updatePages,
    };
  },
  mounted() {},
};
</script>
<style scoped>
.a {
  height: 100vh;
  width: 100vw;
}
</style>
<style>
* {
  color: white;
}
.p {
  background-color: gray;
  height: 90vh;
  max-height: fit-content;
  width: 90%;
  margin: auto;
  overflow: scroll;
}
.b {
  max-width: 300px;
}
.s {
  width: calc(90vw - 300px);
}
.ss {
  width: calc(45vw - 150px);
}
@media (max-width: 600px) {
  .p {
    margin: 10px auto;
    height: auto;
  }
  .s {
    width: 90%;
    margin-top: 10px;
  }
}
@media (max-width: 900px) {
  .ss {
    margin: auto;
    width: 90%;
    max-width: 300px;
  }
}
</style>
