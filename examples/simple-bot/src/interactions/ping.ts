import { defineInteraction } from 'lumex'

export default defineInteraction({
  name: 'ping',
  async execute() {
    const { reply } = useInteraction()
    reply('Pong!')
  },
})
