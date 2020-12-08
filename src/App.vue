<template>
  <div id="app">
    <h2>富文本编辑器自带七牛上传图片</h2>
    <h3>{{qiniuContent}}</h3>
    <xd-qiniu-editor
      style="width: 70%"
      action="https://up-z1.qiniup.com"
      :height="100"
      :qiniu-options="qiniuOptions"
      :z-index="10000"
      v-model="qiniuContent"
    ></xd-qiniu-editor>
    <hr>
    <h2>富文本编辑器,用户自定义上传图片</h2>
    <h3>{{customContent}}</h3>
    <xd-editor
      style="width: 70%"
      action="https://sandbox-c.jufubao.cn/api/admin/common/upload"
      :params="params"
      :headers="{}"
      :height="100"
      :z-index="10000"
      :upload-type="['jpeg','jpg','png', 'gif', 'bmp']"
      :size="0.1"
      :insert-img-fn="insertImage"
      v-model="customContent"
    ></xd-editor>
  </div>
</template>

<script>

import XdQiniuEditor from "@/components/XdQiniuEditor";
import XdEditor from "@/components/XdEditor";
export default {
  name: 'app',
  components: {XdEditor, XdQiniuEditor},
  data(){
    return {
      qiniuContent: '<p>七牛图片测试数据</p>',
      qiniuOptions: {
        accoutKey: 'bP3Ca5dtSJBNaWwMkihfhuE30CbAZnYrNzQm6eMN', //七牛AK
        serviceKey: 'pPNgWwRL3_Jlj7cPtpYbkhXn01EOZTtUhOs3NqZM', //七牛SK
        webSiteName: 'e56buystatic', //七牛桶名称
        staticUrl: 'http://static.e56buy.com' //静态域名访问地址
      },

      //自定义文件上传
      customContent:'<p>自定义图片上传测试数据</p>',
      params :{
        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc2FuZGJveC1jLmp1ZnViYW8uY24iLCJpYXQiOjE2MDc0NDMzMTcsImV4cCI6MTYwNzUyOTcxNywiYWNjb3VudF9pZCI6MSwibWVyY2hhbnRfaWQiOjE2MSwiaXAiOiIyNy4xODkuMjI4LjE0IiwiY2hlY2tzdW0iOiI5MjBhZTliNDcxNTczZjk3ZTEwNDAwMTZjYTIwMTZhZiJ9.3XnNYTZIBFFRi6f5gbOBbeTXWQUBIUSkFO053VptuL0'
      }
    }
  },
  methods:{
    insertImage(callback,result){
      callback(result.data['ObjectURL'])
    },
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
