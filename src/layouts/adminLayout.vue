<template>
  <template v-if="user">
    <div class="a row wrap">
      <div class="p b">
        <pages-nav :pages="pages" />
      </div>
      <router-view :pages="pages" />
    </div>
    <div>
      <logger-tab :items="[pages, pageIndexes, ...innerPages]" />
    </div>
  </template>
</template>

<script>
import pagesNav from "@/components/admin/apPagesNav.vue";
import loggerTab from "@/components/admin/loggerTab.vue";
import {
  createInnerPage,
  createPage,
  removeInnerPage,
  removePage,
} from "@/services/service-fb";
import { computed } from "@vue/runtime-core";
import { auth, sign } from "@/services/login-service";

export default {
  components: {
    pagesNav,
    loggerTab,
  },
  data() {
    return {
      user: false,
      pages: [],
      innerPages: [],
      pageIndexes: [],
    };
  },
  methods: {
    checkUser: function () {
      this.user = false;
      if (auth.currentUser != null) this.user = true;
      else {
        sign(localStorage.getItem("m"), localStorage.getItem("p")).then(
          (this.user = true)
        );
      }
    },
    addPage: function (page) {
      const pageItem = { name: page, type: "OneText" };
      return createPage(pageItem).then((res) => {
        this.pages.push(res);
        this.$router.push(`/ap/pageCreate/${page}/${res.id}`);
      });
    },
    removePage: function (page) {
      const id = this.$route.params.id;
      return removePage(id).then(() => {
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
    removeManyPage: function (pages, i) {
      const id = this.$route.params.id;
      const iid = this.$route.params.iid;
      return removeInnerPage(id, iid).then(() => {
        pages = pages.filter((i) => i.id != iid);
        this.innerPages[i] = pages;
        const a = `/ap/pageEdit/ManyText/${this.$route.params.name}/${id}`;
        this.$router.push(a);
      });
    },
    updateManyPages: function (id, page) {
      const i = this.addManyPageCheck(id);
      if (i) {
        const pages = this.innerPages[i.index];
        if (page != "")
          if (pages.find((it) => it.name == page))
            return this.removeManyPage(pages, i.index);
          else return this.addManyPage(i.id, page, pages);
        else return new Promise((resolve) => resolve(false));
      }
    },
    setPages: function (pages) {
      this.pages = pages;
    },
  },
  provide() {
    return {
      setPages: this.setPages,
      setManyPages: this.setManyPages,
      updatePages: this.updatePages,
      getInnerPages: computed(() => [this.innerPages, this.pageIndexes]),
      addManyPage: this.addManyPage,
      updateManyPages: this.updateManyPages,
    };
  },
  mounted() {
    this.checkUser();
  },
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
::-moz-selection {
  /* Code for Firefox */
  color: black;
  background: white;
}

::selection {
  color: black;
  background: white;
}
.ql-picker-item {
  color: black !important;
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
.ql-editor {
  background-color: #000;
}
</style>
