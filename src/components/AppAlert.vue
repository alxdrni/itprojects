<template>
  <div
    v-if="alert"
    class="cover"
    @click.self="cancel"
  >
    <div class="alert">
      <div class="alert__text">
        {{ alert.text }}
      </div>
      <div class="alert__bar">
        <app-button
          autofocus
          @click="cancel"
        >
          Cancel
        </app-button>
        <app-button
          inverse
          @click="confirm"
        >
          {{ alert.button }}
        </app-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppButton from './AppButton.vue'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export default {
  components: {
    AppButton
  },
  computed: {
    ...mapState([
      'alert'
    ])
  },
  watch: {
    alert (val) {
      val ? disableBodyScroll() : enableBodyScroll()
    }
  },
  methods: {
    ...mapActions([
      'setAlert'
    ]),
    cancel () {
      this.setAlert(null)
    },
    confirm () {
      this.alert.action()
      this.setAlert(null)
    }
  }
}
</script>

<style>
.cover {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: color(var(--black-color) alpha(0.5));
}

.alert {
  max-width: 400px;
  padding: 24px;
  background-color: var(--white-color);
}

.alert__text {
  margin-bottom: 24px;
  text-align: center;
}

.alert__bar {
  display: flex;
  justify-content: center;

  & > *:not(:only-child):not(:last-child) {
    margin-right: 12px;
  }
}
</style>
