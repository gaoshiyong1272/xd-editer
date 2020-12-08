<template>
  <div id="app">
    <h2>富文本编辑器自带七牛上传图片工</h2>
    <h3>{{qiniuContent}}</h3>
    <xd-qiniu-editor
      action="https://up-z1.qiniup.com"
      :height="400"
      :qiniu-options="qiniuOptions"
      :z-index="10000"
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
      qiniuOptions: {
        accoutKey: 'bP3Ca5dtSJBNaWwMkihfhuE30CbAZnYrNzQm6eMN', //七牛AK
        serviceKey: 'pPNgWwRL3_Jlj7cPtpYbkhXn01EOZTtUhOs3NqZM', //七牛SK
        webSiteName: 'e56buystatic', //七牛桶名称
        staticUrl: 'http://static.e56buy.com' //静态域名访问地址
      }
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
