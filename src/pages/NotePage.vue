<template>
  <app-page>
    <app-header>
      <template
        v-if="currentNoteIsChanged"
      >
        <div
          class="header__logo header__logo--link"
          @click="discardChangesWithAlert"
        >
          todoApp
        </div>
        <app-button
          @click="discardChangesWithAlert"
        >
          Discard
        </app-button>
        <app-button
          inverse
          @click="saveCurrentNote"
        >
          Save
        </app-button>
      </template>
      <template
        v-else
      >
        <router-link
          class="header__logo header__logo--link"
          :to="{ name: 'home' }"
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
      </template>
    </app-header>
    <template
      v-if="currentNote"
    >
      <app-footer>
        <app-button
          :disabled="!undoIsActive"
          @click="undoSnapshot"
        >
          Undo
          <span v-if="undoSteps">{{ undoSteps }}</span>
        </app-button>
        <app-button
          :disabled="!redoIsActive"
          @click="redoSnapshot"
        >
          Redo
          <span v-if="redoSteps">{{ redoSteps }}</span>
        </app-button>
      </app-footer>
      <div
        class="page__content page__content--single"
      >
        <app-note
          :note="currentNote"
        />
      </div>
    </template>
    <template
      v-else
    >
      <div
        class="page__content page__content--full"
      >
        <div class="page__text">
          404. Page not found
        </div>
      </div>
    </template>
  </app-page>
</template>

<script>
import AppPage from './AppPage.vue'
import AppHeader from './../components/AppHeader.vue'
import AppFooter from './../components/AppFooter.vue'
import AppNote from './../components/AppNote.vue'
import AppButton from './../components/AppButton.vue'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'NotePage',
  components: {
    AppPage,
    AppHeader,
    AppFooter,
    AppNote,
    AppButton
  },
  computed: {
    ...mapState([
      'currentNote'
    ]),
    ...mapGetters([
      'currentNoteIsChanged',
      'undoIsActive',
      'redoIsActive',
      'undoSteps',
      'redoSteps'
    ])
  },
  mounted () {
    !this.currentNote && this.setCurrentNote(this.$route.params.id)
    this.clearSnapshots()
  },
  beforeDestroy () {
    this.setCurrentNote(null)
    this.clearSnapshots()
  },
  methods: {
    ...mapActions([
      'discardChangesWithAlert',
      'setCurrentNote',
      'saveCurrentNote',
      'undoSnapshot',
      'redoSnapshot',
      'clearSnapshots'
    ])
  }
}
</script>
