<template>
  <div class="menu">
    <a v-for="(작명, i) in 메뉴들" :key="i"> {{ 작명 }}</a>
  </div>
  <div class="black-bg" v-if="모달창열렸니 == true">
    <div class="white-bg">
      <h4>상세페이지</h4>
      <p>상세페이지내용임</p>
    </div>
  </div>
  <div>
    <h4 :style="스타일">XX 원룸</h4>
    <p>{{ price1 }} 만원</p>
  </div>
  <div>
    <h4>{{ products[0] }}</h4>
    <p>50만원</p>
    <button @click="increase()">허위매물신고</button>
    <span>신고수 : {{ 신고수 }}</span>
  </div>
  <div>
    <h4>{{ products[1] }}</h4>
    <p>50만원</p>
  </div>
  <div>
    <h4>{{ products[2] }}</h4>
    <p>50만원</p>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      price1: 60,
      스타일: "color:red",
      products: ["역삼동", "천호동", "마포구"],
      메뉴들: ["Home", "Shop", "About"],
      신고수: 0,
      모달창열렸니 : true,
    };
  },
  methods: {
    increase() {
      this.신고수 += 1;
    },
  },
};
</script>

<style>
#app {
  text-align: center;
}
.menu {
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}
.menu a {
  color: white;
  padding: 10px;
}
body {
  margin : 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%; height:100%;
  background: rgba(0,0,0,0.5);
  position: fixed; padding: 20px;
}
.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
} 
</style>
