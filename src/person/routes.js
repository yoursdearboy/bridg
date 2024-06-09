import PersonsIndex from './PersonsIndex.vue'
import PersonShow from './PersonShow.vue'

export default [
  {
    path: '/persons',
    children: [
      {
        path: '',
        component: PersonsIndex
      },
      {
        name: 'show-person',
        path: ':id',
        component: PersonShow
      }
    ]
  }
]
