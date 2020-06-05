import { nanoid } from 'nanoid'
export default [
  {
    id: nanoid(),
    title: 'Today',
    todos: [
      {
        id: nanoid(),
        done: false,
        text: 'Plan the family trip to Norway'
      },
      {
        id: nanoid(),
        done: false,
        text: 'Book tickets to London'
      },
      {
        id: nanoid(),
        done: true,
        text: 'Plan David\'s birthday event'
      },
      {
        id: nanoid(),
        done: true,
        text: 'Groceries for dinner'
      },
      {
        id: nanoid(),
        done: false,
        text: 'Finish design for new site'
      },
      {
        id: nanoid(),
        done: true,
        text: 'Get flowers for mom'
      }
    ]
  },
  {
    id: nanoid(),
    title: 'Tomorrow',
    todos: [
      {
        id: nanoid(),
        done: false,
        text: 'Send the presentation to Jeff'
      },
      {
        id: nanoid(),
        done: false,
        text: 'Take the jacket to dry cleaning'
      },
      {
        id: nanoid(),
        done: true,
        text: 'Fix dad\'s tablet'
      },
      {
        id: nanoid(),
        done: true,
        text: 'Finalize presentation'
      }
    ]
  },
  {
    id: nanoid(),
    title: 'Upcoming',
    todos: [
      {
        id: nanoid(),
        done: false,
        text: 'Talk with Steve about this trip'
      },
      {
        id: nanoid(),
        done: false,
        text: 'Send report to Frank'
      }
    ]
  }
]
