export default {
  // записать данных для модального окна
  SET_ALERT (state, alert) {
    state.alert = alert
  },

  // записать массив заметок
  SET_NOTES (state, notes) {
    state.notes = notes
  },

  // установить значения индекса указателя операции изменения
  SET_ACTIVE_SNAPSHOT_INDEX (state, index) {
    state.activeSnapshotIndex = index
  },

  // сохранить операцию изменения
  SAVE_SNAPSHOT (state, snapshot) {
    const snapshots = state.snapshots.slice(0, state.activeSnapshotIndex + 1)

    if (snapshots.length > state.snapshotsCount) {
      snapshots.shift()
    } else {
      state.activeSnapshotIndex++
    }

    snapshots.push(snapshot)
    state.snapshots = snapshots
  },

  // очистить список операций изменения
  CLEAR_SNAPSHOTS (state) {
    state.snapshots = []
    state.activeSnapshotIndex = -1
  },

  // установить текущую заметку
  SET_CURRENT_NOTE (state, note) {
    state.currentNote = note
  },

  // изменить заголовок текущей заметки
  UPDATE_CURRENT_NOTE_TITLE (state, title) {
    state.currentNote = { ...state.currentNote, title }
  },

  // добавить todo в текущую заметку
  ADD_CURRENT_NOTE_TODO (state, { todo, index }) {
    console.log(index)
    state.currentNote = {
      ...state.currentNote,
      todos: Number.isInteger(index)
        ? [...state.currentNote.todos.slice(0, index), todo, ...state.currentNote.todos.slice(index)]
        : [...state.currentNote.todos, todo]
    }
  },

  // удалить todo текущей заметки
  DELETE_CURRENT_NOTE_TODO (state, todo) {
    state.currentNote = {
      ...state.currentNote,
      todos: state.currentNote.todos.filter(t => t.id !== todo.id)
    }
  },

  // изменить поле done на противоположное значение в конкретном todo текущуей заметкия
  SWITCH_CURRENT_NOTE_TODO_DONE (state, todo) {
    state.currentNote = {
      ...state.currentNote,
      todos: state.currentNote.todos.map(t => {
        if (t.id === todo.id) {
          return { ...t, done: !t.done }
        }
        return t
      })
    }
  },

  // обновить поле text в конкретном todo текущуей заметки
  UPDATE_CURRENT_NOTE_TODO_TEXT (state, { todo, text }) {
    state.currentNote = {
      ...state.currentNote,
      todos: state.currentNote.todos.map(t => {
        if (t.id === todo.id) {
          return { ...t, text }
        }
        return t
      })
    }
  }
}
