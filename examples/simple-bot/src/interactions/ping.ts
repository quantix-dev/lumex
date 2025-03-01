import { defineInteraction, Role } from 'lumex'

export default defineInteraction({
  name: 'ping',
  options: {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: Role,
    },
  },
  execute() {

  },
})
