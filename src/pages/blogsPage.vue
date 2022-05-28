<template>
  <div class="page">
    <q-carousel
      v-model="page.num"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      control-color="secondary"
      arrows
      @before-transition="pageUpdate"
      class="rounded-borders coursel bg-primary"
    >
      <q-carousel-slide
        v-for="i in page.itemsShow.length != 0
          ? [...Array(page.num + 2).keys()]
          : [...Array(page.num + 1).keys()]"
        :key="i"
        :name="i"
        class="row wrap flex-center justify-around"
      >
        <q-card
          class="bg-primary"
          :style="`width: ${card.w}px; height: ${card.h}px; `"
          v-for="item in page.itemsShow"
          :key="item"
          @click="openPost(item)"
        >
          <q-img
            :src="require('@/assets/logo.jpeg')"
            :style="`width: ${card.w}px; height: ${card.h}px; `"
          >
            <div class="absolute-bottom text-subtitle1 text-left">
              {{ item.title }}
            </div>
          </q-img>
        </q-card>
        <p v-if="page.itemsShow.length == 0">No more Content</p>
      </q-carousel-slide>
    </q-carousel>

    <q-dialog
      v-model="dialog.show"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar class="fixed-top" style="z-index: 10000">
          <p class="text-white p">{{ dialog.item.pubDate }}</p>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-img
            :src="require('@/assets/dişi_yatay_uzun.png')"
            style="width: 100%"
          >
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ dialog.item.title }}
            </div>
          </q-img>
        </q-card-section>
        <q-card-section>
          <div v-html="dialog.item.content" style="max-width: 100%"></div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { getPost, getPosts } from "@/services/getBlogs";
getPost, getPosts;
export default {
  data() {
    return {
      pageType: "posts",
      card: {
        w: 300,
        h: 200,
      },
      dialog: {
        show: false,
        item: {},
      },
      page: {
        num: 0,
        maxItem: 0,
        navItem: {},
        itemsAll: [],
        itemsShow: [],
        stop: false,
      },
    };
  },
  methods: {
    setPaginationDefault: function () {
      const w = window.innerWidth;
      const h = window.innerHeight;
      let col = Math.floor(((w / 10) * 7) / this.card.w);
      let row = Math.floor(((h / 10) * 7) / this.card.h);
      if (col == 0) col = 1;
      if (row == 0) row = 1;
      this.page.maxItem = col * row;
    },
    openPost: function (item) {
      this.dialog.item = item;
      this.dialog.show = true;
    },
    getPostsF: function () {
      getPost(this.pageType).then((res) => {
        console.log(res.docs);
        this.page.navItem = res.docs[0].data();
        this.getPosts(true);
      });
    },
    getPostCheck: function () {
      const c = this.page.itemsAll.length / this.page.maxItem;
      const p = this.page.num + 1;
      return p > c;
    },
    getPosts: function (fTime) {
      if (this.getPostCheck() && !this.page.stop)
        getPosts(
          this.pageType,
          this.page.navItem,
          this.page.maxItem,
          fTime
        ).then((res) => {
          const items = res.docs.map((res) => res.data());
          this.page.navItem = items[items.length - 1];
          this.page.itemsAll = this.page.itemsAll.concat(items);
          this.setItemsShow();
        });
      else this.setItemsShow();
    },
    setItemsShow: function () {
      this.page.itemsShow = [];
      const f = this.page.num * this.page.maxItem;
      const l = (this.page.num + 1) * this.page.maxItem;
      const items = [...this.page.itemsAll];
      this.page.itemsShow = items.slice(f, l);
      if (this.page.itemsShow.length == 0) this.page.stop = true;
    },
    pageUpdate: function () {
      this.getPosts();
    },
  },
  mounted() {
    this.setPaginationDefault();
    this.getPostsF();
  },
  watch: {
    page() {},
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
