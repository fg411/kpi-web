<template>
  <div id="app">
    <md-tab-bar v-model="current" :items="items" @change="onChange"></md-tab-bar>
    <div id="nav">
      <router-link transition="md-fade-left" to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view transition="md-slide-left"/>
  </div>
</template>

<script>
import { TabBar, Transition } from 'mand-mobile';

export default {
  components: {
    [TabBar.name]: TabBar,
    [Transition.name]: Transition,
  },
  data() {
    return {
      current: 1,
      items: [{ name: 1, label: 'Home', link: '/' }, { name: 2, label: 'About', link: '/about' }],
    };
  },
  methods: {
    onChange(item) {
      this.$router.replace(item.link);
    },
  },
};
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
