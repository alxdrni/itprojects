<template>
  <li
    :class="{'todo--done': todo.done}"
    class="todo"
  >
    <app-button
      :inverse="todo.done"
      class="todo__checkbox"
      :disabled="lock"
      paddingless
      tiny
      @click="switchCurrentNoteTodo(todo)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <polygon
          v-if="todo.done"
          points="13.243 5.172 11.828 3.757 6.181 9.404 3.894 7.117 2.48 8.531 4.767 10.819 4.757 10.828 6.172 12.243 6.181 12.233 6.191 12.243 7.606 10.828 7.596 10.819 13.243 5.172"
        />
      </svg>
    </app-button>
    <div
      ref="text"
      class="todo__text"
      :contenteditable="!lock && !todo.done"
      @input="debounceChangeText"
      @blur="changeText"
      @keydown.enter.prevent="e => e.target.blur()"
    />
    <app-button
      v-if="!lock"
      class="todo__delete"
      paddingless
      tiny
      round
      @click="deleteCurrentNoteTodo(todo)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <polygon points="12.243 5.172 10.828 3.757 8 6.586 5.172 3.757 3.757 5.172 6.586 8 3.757 10.828 5.172 12.243 8 9.414 10.828 12.243 12.243 10.828 9.414 8 12.243 5.172" />
      </svg>
    </app-button>
  </li>
</template>

<script>
import { mapActions } from 'vuex'
import AppButton from './AppButton.vue'
import debounce from 'lodash.debounce'

export default {
  components: {
    AppButton
  },
  props: {
    lock: {
      type: Boolean,
      default: false
    },
    todo: {
      type: Object,
      required: true,
      default () {
        return null
      }
    }
  },
  computed: {
    debounceChangeText () {
      return debounce(this.changeText, 500)
    }
  },
  watch: {
    todo: function ({ text }) {
      const currentText = this.$refs.text.textContent.replace(/(\r\n|\n|\r)/gm, '')

      if (text !== currentText.trim()) {
        if (this.$refs.text) this.$refs.text.textContent = text
      }
    }
  },
  mounted () {
    if (this.$refs.text) this.$refs.text.textContent = this.todo.text
  },
  methods: {
    ...mapActions([
      'deleteCurrentNoteTodo',
      'switchCurrentNoteTodo',
      'updateCurrentNoteTodo'
    ]),
    changeText (e) {
      const currentText = e.target.textContent.replace(/(\r\n|\n|\r)/gm, '').trim()
      if (this.todo.text !== currentText) this.updateCurrentNoteTodo({ todo: this.todo, text: currentText })
    }
  }
}
</script>

<style>
.todo {
  display: flex;
  align-items: center;
  line-height: 18px;

  &:not(:last-child) {
    margin-bottom: 6px;
  }
}

.todo--done {
  text-decoration: line-through;
  color: var(--dark-gray-color);
}

.todo__checkbox {
  flex: 0 0 auto;
  margin-right: 6px;
}

.todo__text {
  flex: 1 1 0;
  padding: 5px 7px;
  line-height: 18px;

  &[contenteditable="true"] {
    position: relative;
    padding: 4px 6px;
    border: 1px solid var(--gray-color);
    border-radius: 8px;

    &:focus {
      border: 1px solid var(--dark-gray-color);
      outline: none;
    }
  }
}

.todo__delete {
  flex: 0 0 auto;
  margin-left: 6px;
}
</style>
