<template>
  <div id="app">
    <h1>Vue App ID Finder Web App</h1>
    <AppIdFinder />
  </div>
</template>

<script>
import AppIdFinder from './components/AppIdFinder.vue';

export default {
  name: 'App',
  components: {
    AppIdFinder
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>