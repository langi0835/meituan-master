<template>
  <div id="app">
    
    <!-- header -->
    <Myheader></Myheader>
    
    <!-- nav -->
    <Mynav></Mynav>

    <!-- content -->    
    <router-view></router-view>
  </div>
</template>

<script>
import Myheader from './components/Header/Header';
import Mynav from './components/Nav/Nav';

export default {
  name: "App",
  components: {
    Myheader,Mynav
  }
};
</script>

<style>

</style>
