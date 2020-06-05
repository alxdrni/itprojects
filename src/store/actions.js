import router from './../router'
import { nanoid } from 'nanoid'
import cloneDeep from 'lodash.clonedeep'

import sampleNotes from './../api/sampleNotes'

export default {
  // загрузить хранилище
  loadNotesFromLocalStorage ({ commit }) {
    const notes = localStorage.getItem('notes')
    notes && commit('SET_NOTES', JSON.parse(notes))
  },
  // сохранить хранилище
  saveNotesToLocalStorage ({ state }) {
    localStorage.setItem('notes', JSON.stringify(state.notes))
  },
  // загрузить данные для примера
  loadSampleNotes ({ commit, dispatch }, alert) {
    commit('SET_NOTES', sampleNotes)
    dispatch('saveNotesToLocalStorage')
  },

  // записать данные для модального окна
  setAlert ({ commit }, alert) {
    commit('SET_ALERT', alert)
  },

  // создать новую заметку с переходом на страницу редактирования
  createNote ({ state, commit }) {
    const id = nanoid()
    const note = {
      id,
      title: 'New note',
      todos: []
    }
    commit('SET_CURRENT_NOTE', note)
    router.push({
      name: 'note',
      params: { id }
    })
  },

  // удалить заметку с переходом на главную страницу
  deleteNoteWithAlert ({ state, commit, dispatch }, id) {
    commit('SET_ALERT', {
      text: 'Do you really want to delete the note?',
      button: 'Delete',
      action: () => {
        commit('SET_NOTES', state.notes.filter(n => n.id !== id))
        dispatch('saveNotesToLocalStorage')
        if (state.route.name !== 'home') router.push({ name: 'home' })
      }
    })
  },

  // перейти на главную страницу без подтверждения изменений
  discardChangesWithAlert ({ state, commit }) {
    commit('SET_ALERT', {
      text: 'Do you really want to discard changes?',
      button: 'Discard',
      action: () => {
        router.push({ name: 'home' })
      }
    })
  },

  // сохранить измененную текущую заметку
  saveCurrentNote ({ state, commit, dispatch }) {
    const note = state.currentNote
    const index = state.notes.findIndex(n => n.id === note.id)
    if (index === -1) {
      commit('SET_NOTES', [...state.notes, cloneDeep(note)])
    } else {
      commit('SET_NOTES', [...state.notes.slice(0, index), cloneDeep(note), ...state.notes.slice(index + 1)])
    }
    dispatch('clearSnapshots')
    dispatch('saveNotesToLocalStorage')
    router.push({ name: 'home' })
  },

  // задать текущую заметку
  setCurrentNote ({ state, commit }, id) {
    const note = (id && state.notes.find(n => n.id === id)) || null
    console.log(state.notes)
    commit('SET_CURRENT_NOTE', cloneDeep(note))
  },

  // изменить заголовок текущей заметки с сохранением операции изменения
  updateCurrentNoteTitle ({ commit, state }, title) {
    const oldTitle = state.currentNote.title

    const undo = { type: 'UPDATE_CURRENT_NOTE_TITLE', payload: oldTitle }
    const redo = { type: 'UPDATE_CURRENT_NOTE_TITLE', payload: title }

    commit('SAVE_SNAPSHOT', { undo, redo })

    commit(redo.type, redo.payload)
  },

  // добавить todo в текущую заметку с сохранением операции изменения
  addCurrentNoteTodo ({ commit, state }) {
    const todo = {
      id: nanoid(),
      text: 'New todo',
      done: false
    }

    const undo = { type: 'DELETE_CURRENT_NOTE_TODO', payload: todo }
    const redo = { type: 'ADD_CURRENT_NOTE_TODO', payload: { todo } }

    commit('SAVE_SNAPSHOT', { undo, redo })

    commit(redo.type, redo.payload)
  },

  // удалить todo текущей заметки с сохранением операции изменения
  deleteCurrentNoteTodo ({ commit, state }, todo) {
    const index = state.currentNote.todos.findIndex(t => t.id === todo.id)

    const undo = { type: 'ADD_CURRENT_NOTE_TODO', payload: { todo, index } }
    const redo = { type: 'DELETE_CURRENT_NOTE_TODO', payload: todo }

    commit('SAVE_SNAPSHOT', { undo, redo })

    commit(redo.type, redo.payload)
  },

  // изменить поле done на противоположное значение в конкретном todo текущуей заметки с сохранением операции изменения
  switchCurrentNoteTodo ({ commit, state }, todo) {
    const undo = { type: 'SWITCH_CURRENT_NOTE_TODO_DONE', payload: todo }
    const redo = { type: 'SWITCH_CURRENT_NOTE_TODO_DONE', payload: todo }

    commit('SAVE_SNAPSHOT', { undo, redo })

    commit(redo.type, redo.payload)
  },

  // обновить поле text в конкретном todo текущуей заметки с сохранением операции изменения
  updateCurrentNoteTodo ({ commit, state }, { todo, text }) {
    const oldText = state.currentNote.todos.find(t => t.id === todo.id).text

    const undo = { type: 'UPDATE_CURRENT_NOTE_TODO_TEXT', payload: { todo, text: oldText } }
    const redo = { type: 'UPDATE_CURRENT_NOTE_TODO_TEXT', payload: { todo, text } }

    commit('SAVE_SNAPSHOT', { undo, redo })

    commit(redo.type, redo.payload)
  },

  // сохранить операцию изменения
  saveSnapshot ({ commit, state }, snapshot) {
    commit('SAVE_SNAPSHOT', snapshot)
  },

  // сохранить операцию изменения
  clearSnapshots ({ commit, state }) {
    commit('CLEAR_SNAPSHOTS')
  },

  // установить значения индекса указателя операции изменения
  setActiveSnapshotIndex ({ commit }, index) {
    commit('SET_ACTIVE_SNAPSHOT_INDEX', index)
  },

  // отменить внесенные изменения
  undoSnapshot ({ commit, state, getters }) {
    if (getters.undoIsActive) {
      const mutation = state.snapshots[state.activeSnapshotIndex].undo
      commit(mutation.type, mutation.payload)
      commit('SET_ACTIVE_SNAPSHOT_INDEX', state.activeSnapshotIndex - 1)
    }
  },

  // повторить внесенные изменения
  redoSnapshot ({ commit, state, getters }) {
    if (getters.redoIsActive) {
      const mutation = state.snapshots[state.activeSnapshotIndex + 1].redo
      commit(mutation.type, mutation.payload)
      commit('SET_ACTIVE_SNAPSHOT_INDEX', state.activeSnapshotIndex + 1)
    }
  }
}
