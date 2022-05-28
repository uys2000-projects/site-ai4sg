<template>
  <div class="page">
    <q-carousel
      v-model="page"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="secondary"
      arrows
      class="rounded-borders coursel bg-primary"
    >
      <q-carousel-slide
        v-for="i in items.length != 0
          ? [...Array(page + 2).keys()]
          : [...Array(page + 1).keys()]"
        :key="i"
        :name="i"
        class="row wrap flex-center justify-around"
      >
        <q-card
          class="bg-primary"
          :style="`width: ${card.width}px; height: ${card.height}px; `"
          v-for="item in items"
          :key="item"
          @click="openPost(item)"
        >
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom text-h6">{{ item.title }}</div>
          </q-img>
        </q-card>
        <p v-if="items.length == 0">No more Content</p>
      </q-carousel-slide>
    </q-carousel>

    <q-dialog
      v-model="dialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar class="fixed-top" style="z-index: 10000">
          <p class="text-white p">{{ item.pubDate }}</p>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ item.title }}
            </div>
          </q-img>
        </q-card-section>

        <q-card-section class="q-pt-none" v-html="item.content">
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { getPostsDB, getPostsB, getPostsN } from "@/services/getBlogs.js";
export default {
  data() {
    return {
      card: {
        width: 300,
        height: 200,
      },
      nav: {
        item: null,
        last: 0,
        now: 0,
      },
      item: {},
      coursel: {
        col: 0,
        row: 0,
        items: 0,
      },
      items: [],
      page: 0,
      dialog: false,
      end: false,
    };
  },
  methods: {
    getPosts: function (lenght) {
      getPostsDB(lenght).then((res) => {
        this.items = res.docs.map((i) => i.data());
      });
    },
    getPostsN: function (start, lenght) {
      getPostsN(start, lenght).then((res) => {
        this.items = res.docs.map((i) => i.data());
      });
    },
    getPostsB: function (start, lenght) {
      if (this.nav.now != 0)
        getPostsB(start, lenght).then((res) => {
          this.items = res.docs.map((i) => i.data());
        });
      else
        getPostsB(start, this.nav.last).then((res) => {
          this.items = res.docs.map((i) => i.data());
        });
    },
    setPaginationDefault: function () {
      this.coursel.col = Math.floor(
        ((window.innerWidth / 10) * 7) / this.card.width
      );
      this.coursel.row = Math.floor(
        ((window.innerHeight / 10) * 7) / this.card.height
      );

      if (this.coursel.col == 0) this.coursel.col = 1;
      if (this.coursel.row == 0) this.coursel.row = 1;
      this.coursel.items = this.coursel.col * this.coursel.row;
    },
    openPost: function (item) {
      this.item = item;
      this.dialog = true;
    },
  },
  mounted() {
    this.setPaginationDefault();
    this.getPosts(this.coursel.items);
  },
  watch: {
    page(nValue, oValue) {
      this.nav.last = this.nav.now;
      this.nav.now = this.items.length;
      if (this.items[0]) this.nav.item = this.items[this.items.length - 1];
      this.items = [];
      if (nValue < oValue) this.getPostsB(this.nav.item, this.coursel.items);
      else this.getPostsN(this.nav.item, this.coursel.items);
      console.log(this.nav.item.title)
      console.log(this.nav)
    },
  },
};
</script>

<style scoped>
.p {
  margin: 5px;
}
.coursel {
  width: 75vw;
  height: 70vh;
  padding: 0px 2vw;
}
.my-card {
  width: 100%;
}
</style>
