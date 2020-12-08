# Gxd-editer

#### 介绍
在线富文本编辑器，支持七牛图片上传，参考地址：http://www.wangeditor.com/index.html

#### 安装教程
npm install --save gxd-editer --registry=https://registry.npm.taobao.org

##### 开发

```bash
# 克隆项目
git clone git@gitee.com:e56buy/xd-editer.git

# 进入项目目录
cd gxd-editer 

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --save --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

##### 引入方式

```javascript
// 全局引入方式

import editer from 'gxd-editer';

// 七牛配置项
Vue.use(editer,{
  qiniu: [{
    accoutKey: 'bP3Ca5dtSJBNaWwMkihfhuE11130CbAZnYrNzQm6eMN', //七牛AK
    serviceKey: 'pPNgWwRL3_Jlj7cPtpYbkhXn01EO11ZTtUhOs3NqZM', //七牛SK
    webSiteName: 'e56buystatic', //七牛桶名称
    staticUrl: 'http://static.e56buy.com' //静态域名访问地址
  }]
});

// 或者在调插件的时候传入七牛相关配置
import editer from 'gxd-editer';
Vue.use(editer,{});

```

##### 七牛图片上传，富文本编辑器

```vue
<template>
    <xd-qiniu-editor
      action="https://up-z1.qiniup.com"
      :height="400"
      :qiniu-options="qiniuOptions"
      :z-index="10000"
      v-model="qiniuContent"
    ></xd-qiniu-editor>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data(){
    return {
      qiniuContent: '<p>测试数据</p>',
      qiniuOptions: {
        accoutKey: 'bP3Ca5dtSJBNaWwMkihfhuE30CbA11ZnYrNzQm6eMN', //七牛AK
        serviceKey: 'pPNgWwRL3_Jlj7cPtpYbkhXn01EOZ22TtUhOs3NqZM', //七牛SK
        webSiteName: 'e56buystatic', //七牛桶名称
        staticUrl: 'http://static.e56buy.com' //静态域名访问地址
      }
    }
  }
}
</script>

```


##### 自定义上传，富文本编辑器

```vue
<template>
    <xd-editor
      style="width: 70%"
      action="https://sandbox-c.jufubao.cn/api/admin/common/upload"
      :params="params"
      :headers="{}"
      :height="150"
      :z-index="10000"
      :upload-type="['jpeg','jpg','png', 'gif', 'bmp']"
      :size="0.1"
      :insert-img-fn="insertImage"
      v-model="customContent"
    ></xd-editor>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data(){
    return {
        customContent:'<p>自定义图片上传测试数据</p>',
        params :{
          params2:'params1',
          params2:'params2'
        }
    }
  }
}
</script>

```
##### 新开发功能
```text
1、定义提示弹窗

```






