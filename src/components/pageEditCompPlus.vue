<template>
  <div>
    <page-edit-comp :pages="pages" />
  </div>
  <div class="pages">
    <q-expansion-item
      expand-separator
      icon="auto_stories"
      :caption="`Pages: ${innerPages?.length}`"
      label="Pages"
    >
      <q-list dark>
        <list-item-pages
          v-for="page in innerPages"
          :key="page"
          icon="description"
          :text="page?.name"
          :text2="page?.type"
          :goTo="
            () =>
              $router.push(
                `/ap/pageEdit/ManyText/${$route.params.name}/${$route.params.id}/ip/${page?.id}`
              )
          "
          @click="name = page?.name"
        />
      </q-list>
    </q-expansion-item>
    <q-input v-model="name" label="Page Name" />
    <q-btn
      class="full-width bg-primary text-white"
      label="Create / Delete Page"
      @click="clickEvent"
    />
  </div>
  {{ innerPages }}
</template>

<script>
import listItemPages from "./listItemPages.vue";
import pageEditComp from "@/components/pageEditComp.vue";
import { getManyPages } from "@/services/service-fb";
export default {
  props: ["pages"],
  inject: ["setManyPages", "updateManyPages", "getInnerPages"],
  components: {
    pageEditComp,
    listItemPages,
  },
  data() {
    return {
      name: "",
    };
  },
  computed: {
    innerPages: function () {
      const id = this.$route.params.id;
      const [innerPages, pageIndexes] = this.getInnerPages;
      const a = pageIndexes.find((i) => i.id == id);
      if (a) {
        const b = innerPages[a["index"]];
        return b;
      } else return "asd";
    },
  },
  methods: {
    getPages: function () {
      const i = this.$route.params.id;
      return getManyPages(i).then((res) => {
        const a = res.docs.map((i) => i.data());
        this.setManyPages(i, a);
      });
    },
    clickEvent: function () {
      if (this.name != "") {
        const i = this.$route.params.id;
        this.updateManyPages(i, this.name);
      }
    },
  },
  mounted() {
    this.getPages();
  },
};
</script>
<style scoped>
.pages {
  border-top: 1px solid black;
  margin-top: 5vh;
}
</style>
