<template>
  <div class="header">
    <!-- 頂部 -->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>

      <div class="search-wrapper">
        <span class="search-icon"></span>
        <input type="text" class="search-bar" placeholder="搜尋店內商品">
      </div>

      <div class="more-wrapper">
        <a class="spelling-bt" href="a">拚單</a>
        <div class="more-bt">
          <i class="s-radious"></i>
          <i class="s-radious"></i>
          <i class="s-radious"></i>
        </div>
      </div>
    </div>

    <!-- 主要內容 -->
    <div class="content-wrapper">
      <div class="icon" :style="head_bg">
      </div>

      <div class="name">
        <h3>{{poiInfo.name}}</h3>
      </div>
      <div class="collect">
        <img src="../../../resource/img/star.png" />
        <span>收藏</span>
      </div>
    </div>

    <!-- 公告內容 -->
    <div class="bulletin-wrapper">
      <img class="icon" v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url" />
      <span class="text" v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</span>
      <div class="detail" v-if="poiInfo.discounts2" @click="showBulletin">
        {{poiInfo.discounts2.length}}個活動
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>

    <!-- 背景 -->
    <div class="bg-wrapper" :style="content_bg">
      {{poiInfo.head_pic_url}}
    </div>

    <!-- 公告詳情頁 -->
    <transition name="detail">
      <div class="bulletin-detail" v-show="isShow">
        <div class="detail-wrapper">
          <div class="main-wrapper" :style="detail_bg">
            <div class="icon" :style="head_bg"></div>
            <h3 class="name">{{poiInfo.name}}</h3>
            <!-- 評價 -->

            <p class="tip">
              {{poiInfo.min_price_tip}} <i>|</i> {{poiInfo.shipping_fee_tip}} <i>|</i> {{poiInfo.delivery_time_tip}}
            </p>
            <p class="time">
              配送時間： {{poiInfo.shipping_time}}
            </p>
            <div class="discounts" v-if="poiInfo.discounts2">
              <p>
                <img :src="poiInfo.discounts2[0].icon_url" />
                <span>{{poiInfo.discounts2[0].info}}</span>
              </p>
            </div>
          </div>
          <div class="close-wrapper" @click="closeBulletin">
            <span class="icon-close"></span>
          </div>
        </div>
      </div>
  </transition>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        isShow:false//公告詳情頁預設是否顯示
      }
    },
    props: {//傳值
      poiInfo: {
        type: Object,
        default: {}
      }
    },
    computed: { // 計算
      content_bg() {
        return "background-image: url(" + this.poiInfo.head_pic_url + ");"
      },
      head_bg() {
        return "background-image: url(" + this.poiInfo.pic_url + ");"
      },
      detail_bg(){
        return "background-image: url(" + this.poiInfo.poi_back_pic_url + ");"
      },
    },
    methods:{
      showBulletin(){
        this.isShow = true;
      },
      closeBulletin(){
        this.isShow = false;
      }
    }
  };
</script>

<style>
  /* 導入css */

  @import url("../../common/styles/icon.css");
  @import url("Header.css");
</style>