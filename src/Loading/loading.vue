<template>
  <div class="fullsreen-loading" id="fullsreen-loading" v-if="show">
    <div class="fullsreen-loading-wrap"></div>
    <div class="fullsreen-loading-animate"></div>
  </div>
</template>
<script>
  export default {
    name: 'XdLoading',
    props: {
      show: {
        type:Boolean,
        show: true
      }
    },
    data() {
      return {}
    },
    watch:{
      show(val){
      }
    }
  }
</script>
<style scoped>
  /**custom-loading**/
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }

    50% {
      -webkit-transform: rotate(360deg);
    }

    100% {
      -webkit-transform: rotate(0deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(360deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }

  .fullsreen-loading {
    position: fixed;
    z-index: 200000;
    left: 0;
    opacity: .6;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .fullsreen-loading-wrap {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10088;
    background: rgba(0,0,0,0.1);
  }

  .fullsreen-loading-animate {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -20px 0 0 -20px;
    z-index: 10089;
    border: 2px solid #409eff;
    border-left-color: transparent;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 2s infinite;
    -webkit-animation: spin 2s infinite;
  }
</style>
