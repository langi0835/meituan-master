<template>
	<div class="ratings">
		<div class="ratings-wrapper">
			<div class="overview">

				<div class="overview-left">
					<div class="comment-score">
						<p class="score">{{ratings.comment_score}}</p>
						<p class="text">商家評分</p>
					</div>
					<div class="other-score">
						<div class="qualty-score item">
							<span class="text">口味</span>
							<Star :score="ratings.quality_score" class="star"></Star>
							<span class="score">{{ratings.quality_score}}</span>
						</div>
						<div class="pack-score item">
							<span class="text">包裝</span>
							<Star :score="ratings.pack_score" class="star"></Star>
							<span class="score">{{ratings.pack_score}}</span>
						</div>
					</div>
				</div>

				<div class="overview-right">
					<div class="delivery-score">
						<p class="score">{{ratings.delivery_score}}</p>
						<p class="text">配送評分</p>
					</div>
				</div>

			</div>

			<Split></Split>
		</div>
	</div>
</template>

<script>
import BScroll from "better-scroll";
import Star from "components/Star/Star";
import Split from "components/Split/Split";

export default {
  components: {
    Star,
    Split
  },
  data() {
    return {
      ratings: {}
    };
  },
  created() {
    let that = this;
    this.$axios
      .get("/api/ratings")
      .then(function(response) {
        //獲取數據
        var dataSourse = response.data;
        if (dataSourse.code == 0) {
          that.ratings = dataSourse.data;
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
@import url("Ratings.css");
</style>
