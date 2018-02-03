<template>
	<div id="app">

		<!-- header -->
		<headerComponent :poiInfo='poiInfo'></headerComponent>

		<!-- nav -->
		<navComponent></navComponent>

		<!-- content -->
		<router-view></router-view>
	</div>
</template>

<script>
	import headerComponent from 'components/Header/Header';
	import navComponent from 'components/Nav/Nav';

	export default {
		name: "App",
		components: {
			headerComponent,
			navComponent
		},
		data() {
			return {
				//header需要的json資料
				poiInfo: {}
			}
		},
		//可在此進行非同步獲取資料
		created() {
			var that = this;

			//因為已經將axios設為vue原型,所以可以用this(vue)呼叫
			this.$axios.get('/api/goods')
				.then(function (response) {//獲取數據
					//console.log(response);
					var dataSourse = response.data;
					//console.log(dataSourse);
					if (dataSourse.code == 0) {
						that.poiInfo = dataSourse.data.poi_info;
						//console.log(that.poiInfo);
					}
				})
				.catch(function (error) { //錯誤處理
					console.log(error);
				});
		}
	};
</script>

<style>
</style>
