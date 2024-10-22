import { defineInteraction } from 'lumina'

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
