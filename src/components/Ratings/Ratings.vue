<template>
	<div class="ratings" ref="ratingView">
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

			<div class="content">
				<div class="rating-select" v-if="ratings.tab">
					<span class="item" @click="selectTypeFn(2)" :class="{'active':selectType==2}">
						{{ratings.tab[0].comment_score_title}}
					</span>
					<span class="item" @click="selectTypeFn(1)" :class="{'active':selectType==1}">
						{{ratings.tab[1].comment_score_title}}
					</span>
					<span class="item" @click="selectTypeFn(0)" :class="{'active':selectType==0}">
						<img src="../../../resource/img/icon_sub_tab_dp_normal@2x.png" v-show="selectType!=0">
						<img src="../../../resource/img/icon_sub_tab_dp_highlighted@2x.png" v-show="selectType==0"> {{ratings.tab[2].comment_score_title}}
					</span>
				</div>
				<div class="label-view">
					<span class="item" v-for="item in ratings.labels" :class="{'highligh':item.label_star>0}">
						{{item.content}}{{item.label_count}}
					</span>
				</div>
				<ul class="rating-list">
					<li v-for="comment in selectComments" class="rating-comment">
						<div class="comment-header">
							<img :src="comment.user_pic_url" v-if="comment.user_pic_url" />
							<img src="../../../resource/img/anonymity.png" v-if="!comment.user_pic_url">
						</div>
						<div class="comment-main">
							<div class="user">{{comment.user_name}}</div>
							<div class="time">{{formatData(comment.comment_time)}}</div>
							<div class="star-wrapper">
								<span class="text">評分</span>
								<Star class="star" :score="comment.order_comment_score"></Star>
							</div>
							<div class="c_content" v-html="commentStr(comment.comment)"></div>
							<div class="img-wrapper" v-if="comment.comment_pics.length">
								<img v-for="item in comment.comment_pics" :src="item.thumbnail_url">
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from "better-scroll";
import Star from "components/Star/Star";
import Split from "components/Split/Split";

const All = 2; //全部
const Picture = 1; //圖片
const Coment = 0; //點評

export default {
  components: {
    Star,
    Split,
    BScroll
  },
  data() {
    return {
      ratings: {},
      selectType: All
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

          //初始化Bscroll
          that.$nextTick(() => {
            if (!that.scroll) {
              that.scroll = new BScroll(that.$refs.ratingView, {
                click: true
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
  },
  methods: {
    selectTypeFn(type) {
      this.selectType = type;

      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    formatData(time) {
      let date = new Date(time * 1000);
      let fmt = "yyyy.MM.dd";
      if (/(y+)/.test(fmt)) {
        let year = date.getFullYear().toString();
        fmt = fmt.replace(RegExp.$1, year);
      }
      if (/(M+)/.test(fmt)) {
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        fmt = fmt.replace(RegExp.$1, month);
      }
      if (/(d+)/.test(fmt)) {
        let myDate = date.getDate();
        if (myDate < 10) {
          myDate = "0" + myDate;
        }
        fmt = fmt.replace(RegExp.$1, myDate);
      }

      return fmt;
    },
    commentStr(content) {
      let rel = /#[^#]+#/g;

      return content.replace(rel, "<i>$&</i>");
    }
  },
  computed: {
    selectComments() {
      if (this.selectType == All) {
        return this.ratings.comments;
      } else if (this.selectType == Picture) {
        let arr = [];

        this.ratings.comments.forEach(comment => {
          if (comment.comment_pics.length) {
            arr.push(comment);
          }
        });

        return arr;
      } else {
        return this.ratings.comments_dp.comments;
      }
    }
  }
};
</script>

<style>
@import url("Ratings.css");
</style>
