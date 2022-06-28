import BlotFormatter from "quill-blot-formatter";
import ImageUploader from "quill-image-uploader";
import HtmlEditButton from "quill-html-edit-button";
import AnimationBlock from "./QuillAnimation"
export default [
  {
    name: "htmlEditButton",
    module: HtmlEditButton,
  },
  {
    name: "animationBlock",
    module: AnimationBlock,
  },
  {
    name: "imageUploader",
    module: ImageUploader,
    options: {
      upload: () => {},
    },
    toolbar: {
      handlers: {
        ani: function (value) {
          console.log(value);
        },
      },
    },
  },
  {
    name: "blotFormatter",
    module: BlotFormatter,
    toolbar: {
      handlers: {
        ani: function (value) {
          console.log(value);
        },
      },
    },
  },
];
