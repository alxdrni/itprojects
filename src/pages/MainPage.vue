<template>
  <app-page>
    <app-header>
      <div
        class="header__logo"
      >
        todoApp
      </div>
      <app-button
        inverse
        @click="createNote"
      >
        Add note
      </app-button>
    </app-header>
    <div
      v-if="notes.length"
      class="page__content page__content--list"
    >
      <app-note
        v-for="note in notes"
        :key="note.id"
        :note="note"
        lock
      />
    </div>
    <div
      v-else
      class="page__content page__content--full"
    >
      <div class="page__text">
        Note list is empty.
        <br>Add one more or
        <a
          class="page__link"
          href="#"
          @click="loadSampleNotes"
        >
          load sample data.
        </a>
      </div>
    </div>
  </app-page>
</template>

<script>
import AppPage from './AppPage.vue'
import AppHeader from './../components/AppHeader.vue'
import AppNote from './../components/AppNote.vue'
import AppButton from './../components/AppButton.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MainPage',
  components: {
    AppPage,
    AppHeader,
    AppNote,
    AppButton
  },
  computed: {
    ...mapState([
      'notes'
    ])
  },
  methods: {
    ...mapActions([
      'createNote',
      'setCurrentNote',
      'loadSampleNotes'
    ])
  }
}
</script>
