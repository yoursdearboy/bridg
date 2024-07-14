import PersonsIndex from './PersonsIndex.vue'
import PersonShow from './PersonShow.vue'
import PersonEdit from './PersonEdit.vue'
import useStore from './store'

export default [
  {
    name: 'persons',
    path: '/persons',
    meta: {
      breadcrumb: 'Persons'
    },
    children: [
      {
        name: 'persons-index',
        path: '',
        component: PersonsIndex
      },
      {
        name: 'person',
        path: ':id',
        meta: {
          breadcrumb: () => useStore().person?.primary_name?.full
        },
        beforeEnter: ({ params: { id } }) => useStore().fetchOne(id),
        children: [
          {
            name: 'person-show',
            path: '',
            component: PersonShow
          },
          {
            name: 'person-edit',
            path: 'edit',
            component: PersonEdit,
            meta: {
              breadcrumb: 'Edit'
            }
          }
        ]
      }
    ]
  }
]
