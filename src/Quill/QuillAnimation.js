import Inline from "quill/blots/inline";

class AnimationBlock extends Inline {
  static create() {
    let node = super.create();
    node.setAttribute("class", "spanblock");
    return node;
  }
}
AnimationBlock.blotName = "spanblock";
AnimationBlock.tagName = "div";

export default AnimationBlock;
