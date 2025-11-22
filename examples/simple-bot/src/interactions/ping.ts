import { defineInteraction } from 'lumex/runtime'

export default defineInteraction({
  name: 'ping',
  async execute() {
    const { reply } = useInteraction()
    reply('Pong!')
  },
})
