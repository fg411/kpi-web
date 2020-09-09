<template>
  <div class="home">
    <transition name="move" mode="out-in" class='transition'>
      <router-view></router-view>
    </transition>
    <md-dialog
    :title="modalOption.title"
    :closable="true"
    :mask-closable="true"
    v-model="isShowModal"
    :btns="modalOption.btns"
    :content="modalOption.content"
    @hide="onHide"
    >
    </md-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Dialog, Toast } from 'mand-mobile';

export default {
  name: 'home',
  data() {
    return {};
  },
  components: {
    [Dialog.name]: Dialog,
    [Toast.name]: Toast
  },
  computed: {
    ...mapState(['modalOption']),
    isShowModal: {
      get() {
        return this.$store.state.isShowModal;
      },
      set(v) {
        this.$store.state.isShowModal = v;
      }
    }
  },
  methods: {
    ...mapActions(['showModal', 'hideModal']),
    onHide() {
      // console.log('hide');
    }
  },
  created() {}
};
</script>

<style>
  @supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {
    .home {
      /* ios < 11.2 */
      padding-left: constant(safe-area-inset-left);
      padding-top: constant(safe-area-inset-top);
      padding-right: constant(safe-area-inset-right);
      padding-bottom: constant(safe-area-inset-bottom);
      /* ios >= 11.2 */
      padding-left: env(safe-area-inset-left);
      padding-top: env(safe-area-inset-top);
      padding-right: env(safe-area-inset-right);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
  .home{
    height: 100vh;
    width: 100vw;
    background-color: rgba(67, 120, 190, 1);
  }
  .md-popup-box {
    /*max-width: 90%*/
  }
  .md-dialog-content{
    width: 6.5rem;
  }
  .md-dialog-body{
    padding: 0.5rem 0.4rem 0.4rem;
  }
  .md-dialog-close{
    top: 0.15rem;
    right: 0.15rem;
  }
  .md-dialog-title{
    font-size: 0.3rem;
    margin-bottom: 0.28rem;
    /*padding: 0 0.3rem;*/
  }
  .md-dialog-text{
    line-height: 0.35rem;
  }
</style>
