<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left"></div>
  </div>
</template>
<script>
  import E from "wangeditor";
  import {genUpToken} from '@/utils/qiniu';
  import loading from "@/Loading/loading";

  //http://www.wangeditor.com/index.html
  export default {
    name: "XdQiniuEditor",
    props:{
      value: String,
      catchData: {},

      size: {
        type: Number,
        default() {
          return 2;
        }
      },

      uploadType: {
        type: Array,
        default() {
          return [];
        }
      },

      zIndex: {
        type: Number,
        default() {
          return 200;
        }
      },

      height: {
        type: Number,
        default() {
          return 150;
        }
      },

      params: {
        type: Object|Array,
        default(){
          return {}
        }
      },

      name: {
        type: String,
        default: 'file',
      },

      qiniuOptinsIndex: {
        type: Number,
        default: 0,
      },

      /**
       * @description 启动文件上传工功能 默认不启动
       */
      action: {
        type: String,
        default: '',
      },

      /**
       * @description 七牛配置选项
       */
      qiniuOptions : {
        type: Object,
        default(){
          return {};
        }

      }
    },
    data() {
      return {
        editor: null, //编辑器对象
        editorContent: '', //编辑器内容
        init: false, //初始化列表
        __qiniuOptions: null,
      };
    },

    watch: {
      value(val){
        if(!this.init) {
          this.editor.txt.html(val);
          this.init = true;
        }
      }
    },

    mounted() {

      //从vue原型链中获取七牛配置
      if (this.$xdOptions && this.checkVarType(this.$xdOptions['qiniu']) === 'object') {
        this.__qiniuOptions = this.$xdOptions['qiniu'];
      }

      //从vue原型链中获取七牛配置
      if (this.$xdOptions && this.checkVarType(this.$xdOptions['qiniu']) === 'array') {
        this.__qiniuOptions = this.$xdOptions['qiniu'][this.qiniuOptinsIndex];
      }


      //用户使用插件的时候传入七牛配置
      if (this.isEmpty(this.qiniuOptions) && !this.__qiniuOptions) {
        this.errorFlag = false;
        this.errorMsg = `
初始化上传组件失败,用七牛云存储需要提供启用配置:
<pre>
const setting = {
  accoutKey: 'bP3Ca5dtSJBNaWwMkihfhuE30CbAZnYrNzQm6eMN', //七牛AK
  serviceKey: 'pPNgWwRL3_Jlj7cPtpYbkhXn01EOZTtUhOs3NqZM', //七牛SK
  webSiteName: 'e56buystatic', //七牛桶名称
  staticUrl: 'http://static.e56buy.com' //静态域名访问地址
}
</pre>
        `;
        throw new Error(`
        使用七牛云存储需要提供启用配置 const setting = {
          accoutKey: 'bP3Ca5dtSJBNaWwMkihfhuE30CbAZnYrNzQm6eMN', //七牛AK
          serviceKey: 'pPNgWwRL3_Jlj7cPtpYbkhXn01EOZTtUhOs3NqZM', //七牛SK
          webSiteName: 'e56buystatic', //七牛桶名称
          staticUrl: 'http://static.e56buy.com' //静态域名访问地址
        }
        `)
      }

      //插件调用时候传入七牛配置，使用启用配置
      if (!this.isEmpty(this.qiniuOptions)) {
        this.__qiniuOptions = this.cloneDeep(this.qiniuOptions);
      }


      this.editor = new E(this.$refs['editorElem']);
      // 编辑器的事件，每次改变会获取其html内容
      this.editor.config.onchange = html => {
        this.editorContent = html;
        this.$emit('input', html);
      };
      this.editor.config.zIndex = this.zIndex;
      this.editor.config.height = this.height;
      this.editor.config.menus = [
        // 菜单配置
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        // 'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'undo', // 撤销
        'redo' // 重复
      ];
      this.editor.config.customAlert = function (s, t) {
        switch (t) {
          case 'success':
            alert(s);
            break
          case 'info':
            alert(s);
            break
          case 'warning':
            alert(s);
            break
          case 'error':
            alert(s);
            break
          default:
            alert(s);
            break
        }
      };

      //====== custom uploadfile ====

      if(this.action) {
        this.editor.config.uploadImgServer = this.action;
        this.editor.config.uploadFileName = this.name;
        this.editor.config.uploadImgMaxSize = this.size * 1024 * 1024;

        //启动限制文件类型上传
        if(this.uploadType.length > 0) {
          this.editor.config.uploadImgAccept = this.uploadType;
        }

        this.editor.config.uploadImgParams = Object.assign({}, this.params, {token: genUpToken(this.__qiniuOptions)});
        this.editor.config.uploadImgHooks = {

          before: function (xhr) {
            console.log(xhr);
            loading(true)
            // 可阻止图片上传
            // return {
            //   prevent: true,
            //   msg: '需要提示给用户的错误信息'
            // }
          },

          // 图片上传并返回了结果，图片插入已成功
          success:(xhr) => {
            console.log('success', xhr)
          },
          // 图片上传并返回了结果，但图片插入时出错了
          fail: (xhr, editor, resData)=> {
            console.log('fail', resData)
          },
          // 上传图片出错，一般为 http 请求的错误
          error: (xhr, editor, resData) => {
            console.log('error', xhr, resData)
          },
          // 上传图片超时
          timeout: (xhr) => {
            console.log('timeout')
          },
          // 图片上传并返回了结果，想要自己把图片插入到编辑器中
          customInsert: (insertImgFn, result) => {
            insertImgFn(`${this.__qiniuOptions.staticUrl}/${result.key}`);
            loading(false)
          }
        }
      }
      //====== custom uploadfile ====
      this.editor.create(); // 创建富文本实例

      //设置编辑器类容
      this.editor.txt.html(this.value);
    },

    methods:{
      /**
       * @description 简单深拷贝
       * @param json
       * @returns {any}
       */
      cloneDeep(json) {
        if (this.checkVarType(json) === 'object'
          || this.checkVarType(json) === 'array'
        ) {
          return JSON.parse(JSON.stringify(json));
        }
        return json;
      },

      checkVarType(obj) {
        let toString = Object.prototype.toString;
        let map = {
          '[object Boolean]': 'boolean',
          '[object Number]': 'number',
          '[object String]': 'string',
          '[object Function]': 'function',
          '[object Array]': 'array',
          '[object Date]': 'date',
          '[object RegExp]': 'regExp',
          '[object Undefined]': 'undefined',
          '[object Null]': 'null',
          '[object Object]': 'object'
        };
        return map[toString.call(obj)];
      },

      /**
       * @description 检查对象或者数组是否为空
       * @param obj
       * @return boolean
       */
      isEmpty(obj) {
        if (this.checkVarType(obj) === 'array' ||
          this.checkVarType(obj) === 'object'
        ) {
          let str = JSON.stringify(obj);
          if (str === '{}' || str === '[]') {
            return true;
          } else {
            return false;
          }
        } else {
          console.log('isEmpty.error', obj);
          throw new Error('只支持数组与JSON对象格式');
        }
      }
    },
  }
</script>
<style scoped>
  #wangeditor {
    box-shadow:0 0 5px rgba(0,0,0,0.1);
  }
  #wangeditor /deep/ .w-e-text-container {
    min-height: 150px!important;
  }

  #wangeditor /deep/ .w-e-menu .w-e-panel-container .w-e-up-img-container .w-e-up-btn {
    font-size: 30px;
    margin: 20px;
  }

</style>
