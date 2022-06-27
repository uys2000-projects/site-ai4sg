<template>
  <div ref="test">
    <QuillEditor
      ref="quill"
      theme="snow"
      :modules="modules"
      toolbar="full"
      @update:content="updateEvent"
    />
  </div>

  <q-btn
    class="full-width bg-black text-white"
    label="Publish"
    :disable="di"
    @click="publish"
  />
</template>

<script>
import BlotFormatter from "quill-blot-formatter";
import ImageUploader from "quill-image-uploader";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { getText, upladImage, uploadText } from "@/services/service-fb";
import { computed } from "@vue/runtime-core";
upladImage;

export default {
  components: {
    QuillEditor,
  },
  inject: ["setTest", "updateImages"],
  data() {
    return {
      di: false,
      route: computed(() => this.$route.path),
      upload: this.uploader,
      modules: [
        {
          name: "imageUploader",
          module: ImageUploader,
          options: {
            upload: (file) => upladImage(file),
          },
        },
        {
          name: "blotFormatter",
          module: BlotFormatter,
          options: {
            /* options */
          },
        },
      ],
    };
  },
  methods: {
    update: function () {
      getText().then((res) => {
        if (res.exists()) {
          const t = res.data().text;
          if (this.$refs.quill) this.$refs.quill.setHTML(t);
          this.setTest(t);
        } else {
          if (this.$refs.quill) this.$refs.quill.setHTML("");
          this.setTest("");
        }
      });
    },
    downloader: function () {
      return new Promise((resolve) => {
        resolve("imgFireStorage/");
      });
    },
    updateEvent: function () {
      this.$refs.quill.getHTML();
      this.updateImages(this.$refs.test);
      this.setTest(this.$refs.quill.getHTML());
    },
    publish: function () {
      this.di = true;
      uploadText(this.$refs.quill.getHTML()).then(() => (this.di = false));
    },
  },

  mounted() {
    this.update();
  },
  watch: {
    route() {
      this.update();
    },
  },
};
</script>
