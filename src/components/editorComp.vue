<template>
  <QuillEditor theme="snow" :modules="modules" toolbar="full" />
</template>

<script>
import BlotFormatter from "quill-blot-formatter";
import ImageUploader from "quill-image-uploader";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { upladImage } from "@/services/service-fb";

export default {
  components: {
    QuillEditor,
  },
  modules: {
    uploader: function (file) {
      const id = this.$route.params.id;
      return upladImage(file, id);
    },
    downloader: function () {
      return new Promise((resolve) => {
        resolve("imgFireStorage/");
      });
    },
  },
  data() {
    return {
      modules: [
        {
          name: "blotFormatter",
          module: BlotFormatter,
          options: {},
        },
        {
          name: "imageUploader",
          module: ImageUploader,
          options: {
            upload: (file) => {
              file;
              const id = this.$route.params.id;
              upladImage(file, id);
              return new Promise((resolve) => {
                resolve("imgFireStorage/");
              });
            },
          },
        },
      ],
    };
  },
};
</script>
