<template>
  <div class="unusual">
    <md-result-page
      text=""
      :subtext="msg">
    </md-result-page>
    <!--<div class="code_box">-->
      <!--<div class="code_inner">-->
        <!--<div class="message">-->
          <!--<p>Error!</p>-->
          <!--<span>Oops! 登录信息已过期,请重新登录</span>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import { ResultPage } from 'mand-mobile';
// import utils from '../libs/_util/index';

export default {
  components: {
    [ResultPage.name]: ResultPage
  },
  data() {
    return {
      msg: '要不然重新打开再试试？',
      url: ''
    };
  },
  mounted() {
    console.log(1);
    console.log(this.$router);
    console.log(this.$route);
  },
  created() {
    // const code = utils.storage_get('code');
    // const state = utils.storage_get('state');
    // this.msg = `code: ${code}; \n state: ${state}`;
    console.log(window.location);
    const { href, search } = window.location;
    this.url = `${href}; ${search}`;
    console.log(2);
    console.log(this.$route.params);
    this.msg = this.$route.params && this.$route.params.msg;
  }
};
</script>

<style scoped>
.unusual{
  text-align: center;
  /*background-color: slategray;*/
  height: 100vh;
  position: relative;
}
.code_box{
  text-align: center;
  width: 50vw;
  height: 50vw;
  box-shadow: inset 4px 4px 20px #999;
  background-color: yellow;
  position: absolute;
  margin-top: calc(50vh - 25vw);
  margin-left: 25vw;
  border-radius: 10px;
  transform: rotate(45deg);
}
.code_inner {
  width: 45vw;
  height: 45vw;
  margin: 2.3vw;
  border: solid 5px #333;
  border-radius: 10px;
}
.message{
  width: 40vw;
  height: 40vw;
  margin: 5vw;
  transform: rotate(-45deg);
  font-size: 0.34rem;
  line-height: 0.55rem;
}
.message p{
  padding: 16px 0;
  font-size: 0.45rem;
  font-weight: bold;
  line-height: 0.65rem;
}
</style>
