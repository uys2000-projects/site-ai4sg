<template>
  <template v-if="type == 'OneText'">
    <div class="p s">
      <editor-comp />
    </div>
    <div class="p b">
      <page-edit :pages="pages" />
    </div>
    <div class="p s ql-snow">
      <h1 style="margin: 0px; border-bottom:1px solid; black">ShowRoom</h1>
      <div class="ql-editor" v-html="test" ref="showRoom"></div>
    </div>
  </template>
  <template v-if="type == 'ManyText'">
    <div class="p s">
      <editor-comp />
    </div>
    <div class="p b">
      <page-edit-plus :pages="pages" />
    </div>
    <div class="p s ql-snow">
      <h1 style="margin: 0px; border-bottom:1px solid; black">ShowRoom</h1>
      <div class="ql-editor" v-html="test" ref="showRoom"></div>
    </div>
  </template>
  <template v-if="type == 'InstaPosts'">
    <div class="p s">
      <page-edit :pages="pages" />
    </div>
  </template>
  <template v-if="type == 'MediumPosts'">
    <div class="p s">
      <page-edit :pages="pages" />
    </div>
  </template>
</template>
<script>
import pageEdit from "../../components/admin/pageEditComp.vue";
import pageEditPlus from "../../components/admin/pageEditCompPlus.vue";
import editorComp from "@/components/admin/editorComp.vue";
import { getImage } from "@/services/service-fb";
export default {
  props: ["pages"],
  components: { pageEdit, pageEditPlus, editorComp },
  data() {
    return {
      type: "",
      test: "",
      imgs: {},
    };
  },
  provide() {
    return {
      setTest: (text) => (this.test = text),
      updateImages: this.updateImages,
    };
  },
  methods: {
    getPageType: function () {
      return this.$route.path.split("/")[3];
    },
    setImage: function (img, url, imgUrl) {
      getImage(url).then((res) => {
        img.alt = imgUrl;
        img.src = res;
        this.imgs[url] = res;
      });
    },
    changeImage: function (img) {
      const imgUrl = img.attributes.src.nodeValue;
      if (imgUrl.indexOf("fireTarget") != -1) {
        const url = imgUrl.split("-")[1];
        if (this.imgs[url] != undefined) {
          img.alt = imgUrl;
          img.src = this.imgs[url];
        } else this.setImage(img, url, imgUrl);
      }
    },
    getImages: function (imgs) {
      for (let i = 0; i < imgs.length; i++) {
        this.changeImage(imgs[i]);
      }
    },
    updateImages: function (ref) {
      let imgs = ref.getElementsByTagName("img");
      let f = this.getImages;
      setTimeout(function () {
        f(imgs);
      }, 100);
    },
  },
  beforeMount() {
    this.type = this.getPageType();
  },
  beforeUpdate() {
    this.type = this.getPageType();
  },
  watch: {
    test() {},
  },
};
</script>
