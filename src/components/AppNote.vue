<template>
  <div
    v-if="note"
    class="note"
  >
    <div class="note__bar">
      <router-link
        v-if="lock"
        class="note__title note__title--link"
        :to="{ name: 'note', params: { id: note.id }}"
      >
        {{ note.title }}
      </router-link>
      <div
        v-else
        ref="title"
        class="note__title"
        :contenteditable="true"
        @input="debounceChangeTitle"
        @blur="changeTitle"
        @keydown.enter.prevent="e => e.target.blur()"
      />
      <app-button
        class="note__delete-button"
        paddingless
        inverse
        @click="deleteNoteWithAlert(note.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 34 34"
          width="34"
          height="34"
        >
          <path d="M27,11H24V10a2.00587,2.00587,0,0,0-2-2H16a2.00587,2.00587,0,0,0-2,2v1H11a1,1,0,0,0,0,2h1l.87,12.14A1.99127,1.99127,0,0,0,14.86,27h8.28a1.99127,1.99127,0,0,0,1.99-1.86L26,13h1a1,1,0,0,0,0-2ZM16,10h6v1H16Zm7.14,15H14.86l-.85712-12H23.994C23.7193,16.82605,23.14,25,23.14,25Z" />
        </svg>
      </app-button>
    </div>
    <ul
      v-if="note.todos.length"
      class="note__todo-list"
    >
      <app-todo
        v-for="todo in todosChunk"
        :key="todo.id"
        :todo="todo"
        :lock="lock"
      />
    </ul>
    <router-link
      v-if="restTodosCount > 0 && lock"
      v-slot="{ href, navigate }"
      :to="{ name: 'note', params: { id: note.id }}"
    >
      <app-button
        class="note__more-items-button"
        small
        borderless
        paddingless
        :href="href"
        @click="navigate"
      >
        +{{ restTodosCount }} more todos
      </app-button>
    </router-link>
    <app-button
      v-if="!lock"
      class="note__add-todo-button"
      small
      @click="addCurrentNoteTodo"
    >
      Add todo
    </app-button>
  </div>
</template>

<script>
import AppButton from './AppButton.vue'
import AppTodo from './AppTodo.vue'
import debounce from 'lodash.debounce'
import { mapActions } from 'vuex'

export default {
  components: {
    AppButton,
    AppTodo
  },
  props: {
    lock: {
      type: Boolean,
      default: false
    },
    note: {
      type: Object,
      required: true,
      default () {
        return null
      }
    }
  },
  computed: {
    debounceChangeTitle () {
      return debounce(this.changeTitle, 500)
    },
    todosChunk () {
      if (this.lock) return this.restTodosCount > 0 ? this.note.todos.slice(0, 3) : this.note.todos
      return this.note.todos
    },
    restTodosCount () {
      return this.note.todos.length - 4
    }
  },
  watch: {
    note: function ({ title }) {
      const currentText = this.$refs.title.textContent.replace(/(\r\n|\n|\r)/gm, '')
      if (title !== currentText.trim()) {
        if (this.$refs.title) this.$refs.title.textContent = title
      }
    }
  },
  mounted () {
    if (this.$refs.title) this.$refs.title.textContent = this.note.title
  },
  methods: {
    ...mapActions([
      'deleteNoteWithAlert',
      'updateCurrentNoteTitle',
      'addCurrentNoteTodo'
    ]),
    changeTitle (e) {
      const currentText = e.target.textContent.replace(/(\r\n|\n|\r)/gm, '').trim()
      if (this.note.title !== currentText) this.updateCurrentNoteTitle(currentText)
    }
  }
}
</script>

<style>
.note {
  position: relative;
  width: 100%;
  padding: 24px;
  border-radius: 6px;
  background-color: var(--white-color);
  box-shadow: 0 0 24px color(var(--dark-gray-color) alpha(0.25));
  transition: box-shadow 0.3s linear;

  &:hover {
    z-index: 100;
    box-shadow: 0 0 36px color(var(--dark-gray-color) alpha(0.5));
  }
}

.note__bar {
  padding-right: 24px;
}

.note__title {
  padding: 0;
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  white-space: normal;
  color: var(--black-color);
  overflow-wrap: anywhere;

  &[contenteditable="true"] {
    position: relative;
    top: -5px;
    padding: 5px 8px;
    border: 1px solid var(--gray-color);
    border-radius: 8px;

    &:focus {
      border: 1px solid var(--dark-gray-color);
      outline: none;
    }
  }
}

.note__title--link {
  display: inline-block;
  width: 100%;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.note__delete-button {
  position: absolute;
  top: 18px;
  right: 0;
  border-radius: 50% 0 0 50%;
}

.note__add-todo-button {
  float: right;
  margin-top: 24px;
}

.note__more-items-button {
  float: right;
  margin-top: 6px;
}

.note__todo-list {
  padding: 0;
  margin: 0;
  margin-top: 24px;
  list-style-type: none;
}
</style>
