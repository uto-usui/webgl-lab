import { defineComponent } from '@vue/composition-api'
import { Navigation } from '@/data/nav'

export default defineComponent({
  name: 'MoleculesNav',
  props: {
    //
  },

  setup() {
    return {
      list: Navigation,
    }
  },
})
