<template>
	<div class="seller">
		<Split></Split>
		<div class="seller-wrapper">

			<div class="seller-view">
				<div class="address-wrapper">
					<div class="address-left">
						{{seller.address}}
					</div>
					<div class="address-right">
						<div class="content"></div>
					</div>
				</div>
				<div class="pics-wrapper" v-if="seller.poi_env" ref="picsView">
					<ul class="pics-list" ref="picsList">
						<li class="pics-item" ref="picsItem" v-for="imgurl in seller.poi_env.thumbnails_url_list">
							<img :src="imgurl">
						</li>
					</ul>
				</div>
				<div class="safety-wrapper">
					查看食品安全檔案
					<span class="icon-keyboard_arrow_right"></span>
				</div>
			</div>

			<Split></Split>

			<div class="tip-wrapper">
				<div class="delivery-wrapper">
					配送服務：{{seller.app_delivery_tip}}
				</div>
				<div class="shipping-wrapper">
					配送時間：{{seller.shipping_time}}
				</div>
			</div>

			<div class="other-wrapper">
				<div class="service-wrapper">
					商家服務
					<div class="poi-service" v-for="item in seller.poi_service">
						<img :src="item.icon"> {{item.content}}
					</div>
				</div>
				<div class="discounts-wrapper">
					<div class="discounts-item" v-for="item in seller.discounts2">
						<div class="icon">
							<img :src="item.icon_url">
						</div>
						<div class="text">
							{{item.info}}
						</div>
					</div>
				</div>
			</div>

			<Split class="bottom"></Split>
		</div>
	</div>
</template>

<script>
import Split from "components/Split/Split";
import BScroll from "better-scroll";
export default {
  components: {
    Split,
    BScroll
  },
  data() {
    return {
      seller: {}
    };
  },
  created() {
    let that = this;
    this.$axios
      .get("/api/seller")
      .then(function(response) {
        //獲取數據
        var dataSourse = response.data;
        if (dataSourse.code == 0) {
          that.seller = dataSourse.data;

          //初始化Bscroll
          that.$nextTick(() => {
            if (that.seller.poi_env.thumbnails_url_list) {
              let imgW = that.$refs.picsItem[0].clientWidth;
              let marginR = 11;
              let width =
                (imgW + marginR) *
                that.seller.poi_env.thumbnails_url_list.length;

              that.$refs.picsList.style.width = width + "px";
            }

            if (!that.scroll) {
              that.scroll = new BScroll(that.$refs.picsView, {
                scrollX: true
              });
            } else {
              that.scroll.refresh();
            }
          });
        }
      })
      .catch(function(error) {
        //錯誤處理
        console.log(error);
      });
  }
};
</script>

<style>
@import url("Seller.css");
</style>
