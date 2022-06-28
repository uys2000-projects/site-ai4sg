<template>
  <div class="column justify-center items-center content-center outter">
    <div class="col-2 menu row wrap">
      <div
        class="text-center"
        v-for="item in menu"
        :key="item"
        @click="menuEvent(item.id)"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="col-10 text-center q-ma-au sc" v-html="html"></div>
  </div>
</template>

<script>
import { getInnerPages, getText } from "@/services/service-u";
export default {
  props: ["inf"],
  data() {
    return {
      menu: [],
      html: "",
    };
  },
  methods: {
    getPages: function () {
      getInnerPages(this.inf.id).then(
        (res) => (this.menu = res.docs.map((i) => i.data()))
      );
    },
    menuEvent: function (id) {
      getText(id).then((res) => {
        if (res.exists) this.html = res.data()?.text;
      });
    },
  },
  mounted() {
    this.getPages();
    this.menuEvent(this.inf.id);
  },
};
</script>
<style scoped>
.outter {
  height: 100%;
}
.menu {
  overflow: hidden auto;
  justify-content: space-around;
}
.menu > div {
  width: 150px;
  padding: 5px;
  background-color: #030303;
  height: max-content;
  overflow: hidden;
}
.menu > div:hover {
  background-color: #000;
  color: blueviolet;
  width: 150px;
}
</style>
