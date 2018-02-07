<template>
	<div class="goods">
		<!-- 分類 -->
		<div class="menu-wrapper" ref="menuScroll">
			<ul>
				<!-- 專場 -->
				<li class="menu-item" :class="{'current':currentIndex===0}" @click="selectMenu(0)">
					<p class="text">
						<img :src="container.tag_icon" v-if="container.tag_icon" class="icon"> {{ container.tag_name }}
					</p>
				</li>

				<!-- 熱銷 -->
				<li class="menu-item" v-for="(item,index) in goods" :class="{'current':currentIndex===index+1}" @click="selectMenu(index+1)">
					<p class="text">
						<img :src="item.icon" v-if="item.icon" class="icon"> {{ item.name }}
					</p>

					<i class="num" v-show="calculateCount(item.spus)">{{calculateCount(item.spus)}}</i>
				</li>
			</ul>
		</div>

		<!-- 右側商品列表 -->
		<div class="foods-wrapper" ref="foodScroll">
			<ul>
				<!-- 專場 -->
				<li class="container-list food-list-hook">
					<div v-for="item in container.operation_source_list">
						<img :src="item.pic_url">
					</div>
				</li>
				<!-- 分類 -->
				<li class="food-list food-list-hook" v-for="item in goods">
					<h3 class="title">{{ item.name }}</h3>

					<ul>
						<li v-for="food in item.spus" class="food-item" @click="showDetail(food)">
							<!-- 商品圖片 -->
							<div class="icon" :style="head_bg(food.picture)">
							</div>

							<div class="content">
								<h3 class="name">{{ food.name }}</h3>
								<!-- 商品描述 -->
								<p class="desc" v-if="food.description">{{ food.description }}</p>
								<div class="extra">
									<!-- 銷售數 -->
									<span class="saled">{{ food.month_saled_content }}</span>
									<!-- 點讚數 -->
									<span class="praise">{{ food.praise_content }}</span>
								</div>
								<img class="product" :src="food.product_label_picture">
								<p class="price">
									<span class="text">${{ food.min_price }}</span>
									<span class="unit">{{ food.unit }}</span>
								</p>
							</div>

							<!-- 商品購買數 -->
							<div class="cartcontrol-wrapper">
								<Cartcontrol :food="food"></Cartcontrol>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>

		<!-- 購物車 -->
		<Shopcart :poiInfo="poiInfo" :selectFoods="selectFoods"></Shopcart>

		<!-- 商品詳情 -->
		<Food :food="selectedFood" ref="foodView"></Food>
	</div>
</template>

<script>
import BScroll from "better-scroll";
import Shopcart from "components/Shopcart/Shopcart";
import Cartcontrol from "components/Cartcontrol/Cartcontrol";
import Food from "components/Food/Food";

export default {
  data() {
    return {
      container: {}, //物件
      goods: [], //集合
      poiInfo: {},
      listHeight: [],
      scrollY: 0,
      menuScroll: {},
      foodScroll: {},
      selectedFood: {}
    };
  },
  components: {
    BScroll,
    Shopcart,
    Cartcontrol,
    Food
  },
  //可在此進行非同步獲取資料
  created() {
    var that = this;

    //因為已經將axios設為vue原型,所以可以用this(vue)呼叫
    this.$axios
      .get("/api/goods")
      .then(function(response) {
        //獲取數據
        var dataSourse = response.data;
        if (dataSourse.code == 0) {
          that.container = dataSourse.data.container_operation_source;
          that.goods = dataSourse.data.food_spu_tags;
          that.poiInfo = dataSourse.data.poi_info;
          //console.log(that.container);
          //console.log(that.goods);
          //console.log(that.poiInfo);

          //Scroll呼叫初始化,netTick可以確保dom渲染完產生list高度後才呼叫
          that.$nextTick(() => {
            that.initScroll();

            //計算商品各分類高度
            that.calculateHeight();
          });
        }
      })
      .catch(function(error) {
        //錯誤處理
        console.log(error);
      });
  },
  methods: {
    head_bg(imgName) {
      return "background-image: url(" + imgName + ");";
    },
    //卷軸的init
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        click: true,
        probeType: 3 //scroll事件參數
      });

      //添加滾動監聽事件
      this.foodScroll.on("scroll", pos => {
        //console.log(pos.y);
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    calculateHeight() {
      //取得對應元素
      let foodlist = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodlist.length; i++) {
        const item = foodlist[i];

        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    //點擊左邊選單
    selectMenu(index) {
      //console.log(index);
      let foodlist = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );

      let el = foodlist[index];
      //el:滾動的dom物件,250:延遲的時間(毫秒)
      this.foodScroll.scrollToElement(el, 250);
    },
    calculateCount(spus) {
      let count = 0;

      spus.forEach(food => {
        if (food.count > 0) {
          count += food.count;
        }
      });

      return count;
    },
    showDetail(food) {
      this.selectedFood = food;
      //顯示商品詳情頁
      this.$refs.foodView.showView();
    }
  },
  computed: {
    currentIndex() {
      //根據右側滾動位置,確認對應的索引
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];

        //確認否在此區間內
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          //console.log(i);
          return i;
        }
      }

      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.spus.forEach(food => {
          if (food.count > 0) {
            foods.push(food);
          }
        });
      });

      return foods;
    }
  }
};
</script>

<style>
@import url("Goods.css");
</style>
