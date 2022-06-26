<template>
  <div class="a row wrap">
    <div class="p b">
      <pages-nav :pages="pages" />
    </div>
    <router-view :pages="pages" />
  </div>
  <div>
    <logger-tab :items="[pages, ...innerPages, pageIndexes]" />
  </div>
  <div>{{ innerPages }}</div>
</template>

<script>
import pagesNav from "@/components/apPagesNav.vue";
import loggerTab from "@/components/loggerTab.vue";
import {
  createInnerPage,
  createPage,
  removeInnerPage,
  removePage,
} from "@/services/service-fb";
import { computed } from "@vue/runtime-core";

export default {
  components: {
    pagesNav,
    loggerTab,
  },
  data() {
    return {
      pages: [],
      innerPages: [],
      pageIndexes: [],
    };
  },
  methods: {
    addPage: function (page) {
      const pageItem = { name: page, type: "OneText" };
      return createPage(pageItem).then((res) => {
        this.pages.push(res);
        this.$router.push(`/ap/pageCreate/${page}`);
      });
    },
    removePage: function (page) {
      let pages = [...this.pages];
      const p = pages.filter((i) => i.name == page);
      return removePage(p[0]).then(() => {
        this.pages = this.pages.filter((i) => i.name != page);
        this.$router.push("/ap/pageCreate");
      });
    },
    updatePages: function (page) {
      if (page != "")
        if (this.pages.find((i) => i.name == page))
          return this.removePage(page);
        else return this.addPage(page);
      else return new Promise((resolve) => resolve(false));
    },
    addManyPageCheck: function (id) {
      return this.pageIndexes.find((i) => i.id == id);
    },
    setManyPages: function (id, pages) {
      if (!this.addManyPageCheck(id)) {
        this.pageIndexes.push({ id: id, index: this.innerPages.length });
        this.innerPages[this.innerPages.length] = pages;
      }
    },
    addManyPage: function (id, pName, pages) {
      const pageItem = { name: pName, text: "" };
      return createInnerPage(id, pageItem).then((res) => {
        pages.push(res);
        const a = `/ap/pageEdit/ManyText/${this.$route.params.name}/${id}/ip/${res.id}`;
        this.$router.push(a);
      });
    },
    removeManyPage: function (pName, pages) {
      const p = [...pages].filter((i) => i.name == pName);
      return removeInnerPage(p[0]).then(() => {
        pages = pages.filter((i) => i.name != pName);
        this.$router.push("/ap/pageCreate");
      });
    },
    updateManyPages: function (id, page) {
      const i = this.addManyPageCheck(id);
      if (i) {
        const pages = this.innerPages[i.index];
        if (page != "")
          if (pages.find((it) => it.name == page))
            return this.removeManyPage(page, pages);
          else return this.addManyPage(i.id, page, pages);
        else return new Promise((resolve) => resolve(false));
      }
    },
  },
  provide() {
    return {
      setPages: (pages) => (this.pages = pages),
      setManyPages: this.setManyPages,
      updatePages: this.updatePages,
      getInnerPages: computed(() => [this.innerPages, this.pageIndexes]),
      addManyPage: this.addManyPage,
      updateManyPages: this.updateManyPages,
    };
  },
  mounted() {},
};
</script>
<style scoped>
.a {
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
<style>
* {
  color: white;
}
.p {
  border-radius: 5px;
  background-color: #333;
  height: 90vh;
  max-height: fit-content;
  width: 90%;
  margin: auto;
  margin-top: 5vh;
  overflow: auto;
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
