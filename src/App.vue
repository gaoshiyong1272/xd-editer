<template>
  <div id="app">
    <h2>富文本编辑器自带七牛上传图片工</h2>
    <h3>
      {{qiniuContent}}
    </h3>
    <xd-qiniu-editor
      action="https://up-z1.qiniup.com'"
      v-model="qiniuContent"
    ></xd-qiniu-editor>
  </div>
</template>

<script>

import XdQiniuEditor from "@/components/XdQiniuEditor";
export default {
  name: 'app',
  components: {XdQiniuEditor},
  data(){
    return {
      qiniuContent: '<p>测试数据</p>'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
