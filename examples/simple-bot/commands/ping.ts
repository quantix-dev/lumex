import { defineInteraction } from '@lumina/core'

export default defineInteraction({
  name: 'ping',
  options: {
    name: {
      type: Object,
    },
  },
  execute({ props: _props }) {
  },
})
