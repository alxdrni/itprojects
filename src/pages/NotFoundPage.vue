<template>
  <app-page>
    <app-header>
      <router-link
        class="header__logo header__logo--link"
        to="/sdfsdf"
      >
        todoApp
      </router-link>
      <router-link
        v-slot="{ href, navigate }"
        :to="{ name: 'home' }"
      >
        <app-button
          inverse
          :href="href"
          @click="navigate"
        >
          Back to notes
        </app-button>
      </router-link>
    </app-header>
    <div
      class="page__content page__content--full"
    >
      <div class="page__text">
        404. Page not found
      </div>
    </div>
  </app-page>
</template>

<script>
import AppPage from './AppPage.vue'
import AppHeader from './../components/AppHeader.vue'
import AppButton from './../components/AppButton.vue'

export default {
  name: 'NotePage',
  components: {
    AppPage,
    AppHeader,
    AppButton
  }
}
</script>
