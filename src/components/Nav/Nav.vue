<template>
  <div class="nav">

    <router-link to="/goods" class="goods nav-item">點菜</router-link>
    <router-link to="/ratings" class="ratings nav-item">評價</router-link>
    <router-link to="/seller" class="seller nav-item">商家</router-link>
    
  </div>
</template>

<script>
  export default{

  }
</script>

<style>
  .nav{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;    
  }

  .nav .nav-item{
    flex: 1;
    text-align: center;
  }
</style>