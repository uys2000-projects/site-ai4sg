<template>
  <div ref="test">
    <QuillEditor
      ref="quill"
      theme="snow"
      :modules="modules"
      :toolbar="toolbar"
      @update:content="updateEvent"
    >
      <template #toolbar>
        <div id="my-toolbar">
          <q-btn
            v-for="animation in animations"
            :key="animation"
            @click="addAnimation(animation.value)"
            :label="animation.name"
          />
        </div>
      </template>
    </QuillEditor>
  </div>

  <q-btn
    class="full-width bg-black text-white"
    label="Publish"
    :disable="di"
    @click="publish"
  />
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";

import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { getText, upladImage, uploadText } from "@/services/service-fb";
import { computed } from "@vue/runtime-core";
import QuillToolBar from "@/Quill/QuillToolBar";
import QuillModules from "@/Quill/QuillModules";
QuillModules[1].options = (file) => upladImage(file);
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
      toolbar: QuillToolBar,
      modules: QuillModules,
      animations: [{ name: "Breath", value: "breath" }],
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
    addAnimation: function (value) {
      let quill = this.$refs.quill.getQuill();
      var range = quill.getSelection();
      console.log(range);
      if (range) {
        quill.formatText(range, value);
      }
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
