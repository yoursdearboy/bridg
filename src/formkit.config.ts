import { defaultConfig } from '@formkit/vue'
import { ru } from '@formkit/i18n'
import { rootClasses } from './formkit.theme'

export default defaultConfig({
  config: {
    rootClasses
  },
  locales: { ru },
  locale: 'ru'
})
