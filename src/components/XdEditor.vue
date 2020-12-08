<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left"></div>
  </div>
</template>
<script>
  import E from "wangeditor";

  export default {
    name: "XdEditor",
    props:{
      value: String,
      catchData: {},

      zIndex: {
        type: Number,
        default() {
          return 200;
        }
      },
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
      height: {
        type: Number,
        default() {
          return 150;
        }
      },

      /***
       * @description 上传参数
       */
      params: {
        type: Object | Array,
        default() {
          return {}
        }
      },

      /***
       * @description 上传设置headers
       */
      headers: {
        type: Object,
        default(){
          return {}
        }
      },

      name: {
        type: String,
        default: 'file',
      },

      /**
       * @description 启动文件上传工功能 默认不启动
       */
      action: {
        type: String,
        default: '',
      },
      insertImgFn: {
        type: Function,
      }
    },
    data() {
      return {
        editor: null, //编辑器对象
        editorContent: '', //编辑器内容
        init: false, //初始化列表
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
      this.editor = new E(this.$refs['editorElem']);
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
      //====== custom uploadfile ====

      if(this.action) {
        this.editor.config.uploadImgServer = this.action;
        this.editor.config.uploadFileName = this.name;
        this.editor.config.uploadImgMaxSize = this.size * 1024 * 1024;
        //启动限制文件类型上传
        if (this.uploadType.length > 0) {
          this.editor.config.uploadImgAccept = this.uploadType;
        }
        this.editor.config.uploadImgParams = Object.assign({}, this.params);
        this.editor.config.uploadImgHeaders = Object.assign({}, this.headers);
        this.editor.config.uploadImgHooks = {
          // 上传图片之前
          before: function (xhr) {
            console.log(xhr)

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
            if(typeof this.insertImgFn === 'function') {
              this.insertImgFn(insertImgFn, result);
            }else{
              insertImgFn(result.url);
            }

          }
        }
      }
      //====== custom uploadfile ====
      this.editor.create(); // 创建富文本实例

      //设置编辑器类容
      this.editor.txt.html(this.value);
    }
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
