<template>
  <div class="star">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
  //星星長度
  const starLength = 5;
  //星星對應class
  const clsOn = "on";
  const clsHalf = "half";
  const clsOff = "off";

  export default {
    props: {
      score: {
        type: Number
      }
    },
    computed: {
      itemClasses() {
        let result = [];
        //向下取0.5倍數
        let score = Math.floor(this.score * 2) / 2;
        //是否有半星
        let hasDecimal = score % 1 != 0;
        let integer = Math.floor(score);

        for (let i = 0; i < integer; i++) {
          result.push(clsOn);
        }

        if (hasDecimal) {
          result.push(clsHalf);
        }

        while (result.length < starLength) {
          result.push(clsOff);
        }

        return result;
      }
    }
  }
</script>

<style>
  .star{
  font-size: 0;
}

.star .star-item{
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-repeat: no-repeat;
  background-size: 10px 10px;    
}

.star .star-item:last-child{
  margin-right: 0;
}

.star .on{
  background-image: url("../../../resource/img/star24_on@2x.png");
}
.star .half{
  background-image: url("../../../resource/img/star24_half@2x.png");
}
.star .off{
  background-image: url("../../../resource/img/star24_off@2x.png");
}
</style>