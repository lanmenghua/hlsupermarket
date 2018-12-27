<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
html,body,#app,#loginbox,#menu{
  height: 100%;
  margin: 0;
}
</style>
