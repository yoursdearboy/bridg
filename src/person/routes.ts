import PersonsIndex from './PersonsIndex.vue'
import PersonShow from './PersonShow.vue'

export default [
  {
    path: '/persons',
    children: [
      {
        name: 'persons-index',
        path: '',
        component: PersonsIndex
      },
      {
        name: 'person-show',
        path: ':id',
        component: PersonShow
      }
    ]
  }
]
