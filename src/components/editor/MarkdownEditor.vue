<template>
  <div>
    <div id="editorSection"></div>
    <el-button
      type="primary"
      @click="$emit('get-value', tuieditor.getValue())"
      :loading="isPublishing"
      >发布</el-button
    >
    <el-button>预览</el-button>
  </div>
</template>

<script>
import Editor from "tui-editor"; /* ES6 */
import "tui-editor/dist/tui-editor.css"; // editor's ui
import "tui-editor/dist/tui-editor-contents.css"; // editor's content
import "codemirror/lib/codemirror.css"; // codemirror
import "highlight.js/styles/github.css"; // code block highlight
import { toRefs, onMounted, onBeforeUnmount, reactive } from "vue";
export default {
  name: "tuieditor",
  props: {
    isPublishing: {
      type: Boolean,
      default: false,
    },
    // content: String,
    // value: String,
  },
  setup(props) {
    let data = reactive({
      tuieditor: null,
    });
    // const initialize = () => {
    //   console.log(new Editor({
    //     el: document.querySelector("#editorSection"),
    //     initialEditType: "markdown",
    //     previewStyle: "vertical",
    //     height: "400px",
    //   }))

    // };
    onMounted(() => {
      // console.log(
      //   new Editor({
      //     el: document.querySelector("#editorSection"),
      //     initialEditType: "markdown",
      //     previewStyle: "vertical",
      //     height: "400px",
      //   })
      // );
      data.tuieditor = new Editor({
        el: document.querySelector("#editorSection"),
        initialEditType: "markdown",
        previewStyle: "vertical",
        height: "400px",
      });
      data.tuieditor.getHtml();
    });
    onBeforeUnmount(() => {
      data.tuieditor = null;
      // delete tuieditor;
    });

    return {
      ...toRefs(data),
      // initialize,
    };
  },

  // methods: {
  //   initialize() {
  //     if (this.$el) {
  //       this.tuieditor = new Editor({
  //         el: document.querySelector("#editorSection"),
  //         initialEditType: "markdown",
  //         previewStyle: "vertical",
  //         height: "400px",
  //       });
  //       this.tuieditor.getHtml();
  //     }
  //   },
  // },
};
</script>

<style>
#editorSection {
  margin-bottom: 20px;
}
/* tui-editor预览内容窗口不知何种原因造成bug，宽度为0 ，这里暂时给定一个宽度 */
.te-preview {
  width: 450px !important;
}
</style>
