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
export default {
  data() {
    return {
      card: {
        width: 300,
        height: 200,
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
    l: function (item) {
      console.log("logger", item);
    },
    getPosts: function (start, lenght) {
      console.log(start, lenght);

      const url = "/dami";
      fetch(url, {}).then((res) => {
        res.json().then((re) => {
          console.log(re);
          console.log(re.splice(start, lenght));
          this.items = re.splice(start, lenght);
        });
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

      console.log(this.coursel.items, this.coursel.col, this.coursel.row);
    },
    setPagination: function () {},
    openPost: function (item) {
      console.log(item);
      this.item = item;
      this.dialog = true;
      console.log(this.item);
    },
  },
  mounted() {
    this.setPaginationDefault();
    this.getPosts(this.coursel.items * this.page, this.coursel.items);
    this.setPagination();
  },
  watch: {
    page() {
      this.items = [];
      this.getPosts(this.coursel.items * this.page, this.coursel.items);
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
