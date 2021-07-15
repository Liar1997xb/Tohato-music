<template>
  <div>
    <div id="app" :style="change" v-loading="$store.state.loadingStatus">
    <Header></Header>
    <Content></Content>
    <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

export default {
  name: 'app',
  components: {
    Header,
    Content,
    Footer
  },
  data() {
    return {
      change: {
        width: '1022px',
        height: '670px'
      }
    }
  },
  methods: {
    handleRestore() {
      this.change.width = '1022px'
      this.change.height = '670px'
    },
    handleMaximize() {
      this.change.width = '100%'
      this.change.height = '100%'
    }
  }
};
</script>

<style lang="less">
@full-screen: 100%;
#app {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  min-width: 1022px;
  min-height: 670px;
  // width: 1022px;
  // height: 670px;
  margin: auto;
  box-shadow: 0 0 20px #dfdede;
  z-index: 1;
}
</style>
