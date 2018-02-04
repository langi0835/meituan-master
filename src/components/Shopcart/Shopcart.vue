<template>
	<div class="shopcart" :class="{'highligh':totalCount>0}">
		<div class="content-left" :class="{'highligh':totalCount>0}">
			<div class="logo-wrapper" :class="{'highligh':totalCount>0}">
				<span class="icon-shopping_cart logo" :class="{'highligh':totalCount>0}"></span>
				<i class="num" v-show="totalCount">{{totalCount}}</i>
			</div>
			<div class="desc-wrapper">
				<p class="total-price" v-show="totalPrice">$ {{totalPrice}}</p>
				<p class="tip" :class="{'highligh':totalCount>0}">{{shipping_fee_tip}}</p>
			</div>
		</div>

		<div class="content-right" :class="{'highligh':totalCount>0}">
			{{payStr}}
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			min_price_tip: {
				type: String,
				default: ""
			},
			shipping_fee_tip: {
				type: String,
				default: ""
			},
			selectFoods: {
				type: Array,
				default() {
					return [
						// {
						// 	min_price: 5,
						// 	count: 3
						// },
						// {
						// 	min_price: 15,
						// 	count: 1
						// }
					];
				}
			}
		},
		computed: {
			//總數
			totalCount() {
				let num = 0;
				this.selectFoods.forEach(food => {
					num += food.count;
				});

				return num;
			},
			//總金額
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach(food => {
					total += food.min_price * food.count;
				});

				return total;
			},
			//結算按鈕顯示
			payStr() {
				if (this.totalCount > 0) {
					return "去結算";
				} else {
					return this.min_price_tip;
				}
			}
		}
	};
</script>

<style>
	@import url("Shopcart.css");
</style>
