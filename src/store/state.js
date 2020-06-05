export default {
  // массив заметок
  notes: [],
  // текущая редактируемая заметка
  currentNote: null,
  // данные модального окна
  alert: null,
  // количество запоминаемых операций изменения
  snapshotsCount: 99,
  // массив операций изменения
  snapshots: [],
  // индекс указателя операции изменения
  activeSnapshotIndex: -1
}
