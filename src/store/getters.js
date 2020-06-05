export default {
  // была ли изменена текущая заметка
  currentNoteIsChanged (state) {
    if (state.currentNote) return !state.notes.find(n => n.id === state.currentNote.id) || state.snapshots.length
    return false
  },

  // можно ли сделать операцию undo
  undoIsActive (state) {
    return state.activeSnapshotIndex > -1
  },

  // можно ли сделать операцию redo
  redoIsActive (state) {
    return (state.activeSnapshotIndex + 1) < state.snapshots.length
  },

  // количество операций, которые можно отменить
  undoSteps (state) {
    return state.activeSnapshotIndex + 1
  },

  // количество операций, которые можно повторить
  redoSteps (state) {
    return state.snapshots.length - state.activeSnapshotIndex - 1
  }
}
