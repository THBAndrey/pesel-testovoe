<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script>
export default {
  components: {
    Header: () => import('./components/Header')
  }
}
</script>

<style lang="scss">
@import './assets/scss/global.scss';

#app {
  font-family: Lato, sans-serif;
  color: #626262;
  min-height: 100vh;
}
</style>
