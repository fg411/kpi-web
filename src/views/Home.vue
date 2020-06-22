<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div class="md-example-child md-example-child-button md-example-child-button-0">
    <md-button type="primary" loading>Loading</md-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { Button } from 'mand-mobile';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    [Button.name]: Button,
  },
};
</script>
