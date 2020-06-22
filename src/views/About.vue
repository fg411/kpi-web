<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button v-on:click="show = !show">
      Toggle render
    </button>
    <md-button @click="test" type="primary">Click</md-button>
    <!-- <transition mode="out-in" name="fade"> -->
    <!-- <transition name="slide-fade"> -->
    <!-- <transition name="bounce"> -->
    <transition appear>
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>

<script>
import { Button, Toast } from 'mand-mobile';

export default {
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    test() {
      // var con = {};
      const constraints = { audio: true, video: { width: 1280, height: 720, facingMode: 'user' } };
      console.log(constraints);
      console.log(navigator);
      console.log(navigator.mediaDevices);
      console.log(navigator);
      if (navigator.mediaDevices === undefined) {
        Toast.info('navigator.mediaDevices');
        navigator.mediaDevices = {};
      }
      if (navigator.mediaDevices.getUserMedia === undefined) {
        Toast.info('navigator.mediaDevices.getUserMedia');
        navigator.mediaDevices.getUserMedia = (constraint) => {
          const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
          }
          return new Promise((resolve, reject) => {
            getUserMedia.call(navigator, constraint, resolve, reject);
          });
        };
      }
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        Toast.info('getUserMedia');
        console.log(stream);
        const video = document.querySelector('video');
        if ('srcObject' in video) {
          video.srcObject = stream;
        } else {
          video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = (e) => {
          video.play();
        };
      }).catch((err) => {
        Toast.info(`${err.name}:${err.message}`);
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.3, 0.5, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(200px);
  opacity: 0;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounch-in .3s reverse;
}

@keyframes bounce-in {
  0% { transform: scale(0); }
  50% { transform: scale(1.8);}
  100% { transform: scale(1);}
}
</style>
