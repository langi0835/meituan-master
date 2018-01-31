<template>
  <div class="goods">
    <!-- 分類 -->
    <div class="menu-wrapper">
      <ul>
        <!-- 專場 -->
        <li class="menu-item">
            <p class="text">              
              <img :src="container.tag_icon" v-if="container.tag_icon" class="icon"> 
              {{container.tag_name}}
            </p>
          </li>

        <!-- 熱銷 -->
        <li class="menu-item" v-for="(item,index) in goods">
          <p class="text">
            <img :src="item.icon" v-if="item.icon" class="icon"> 
            {{item.name}}
          </p>
        </li>
      </ul>
    </div>

    <!-- 右側商品列表 -->
    <div class="foods-wrapper">
      <ul>
        <!-- 專場 -->
        <li class="container-list">
          <div v-for="(item,index) in container.operation_source_list">
            <img :src="item.pic_url">
          </div>
        </li>
        <!-- 分類 -->
        <li class="food-list" v-for="(item,index) in goods">
          <h3 class="title">{{item.name}}</h3>
          
          <ul>
            <li v-for="(food,index) in item.spus" class="food-item">
              <!-- 商品圖片 -->
              <div class="icon" :style="head_bg(food.picture)">
              </div>

              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <!-- 商品描述 -->
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <!-- 銷售數 -->
                  <span class="saled">{{food.month_saled_content}}</span>
                  <!-- 點讚數 -->
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <img class="product" :src="food.product_label_picture">
                <p class="price">
                  <span class="text">${{food.min_price}}</span>
                  <span class="unit">{{food.unit}}</span>
                </p>
              </div>

            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        container: {},//物件
        goods: [] //集合
      }
    },
    //可在此進行非同步獲取資料
    created() {
      var that = this;

      //因為已經將axios設為vue原型,所以可以用this(vue)呼叫
      this.$axios.get('/api/goods')
        .then(function (response) {//獲取數據
          var dataSourse = response.data;
          if (dataSourse.code == 0) {
            that.container = dataSourse.data.container_operation_source;
            that.goods = dataSourse.data.food_spu_tags;
            console.log(that.container);
            console.log(that.goods);
          }
        })
        .catch(function (error) { //錯誤處理
          console.log(error);
        });
    },
    methods: {
      head_bg(imgName) {
        return "background-image: url(" + imgName + ");"
      }
    }
  };
</script>

<style>
  @import url("Goods.css");
</style>