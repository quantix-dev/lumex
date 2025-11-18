import { defineInteraction } from 'lumex'

export default defineInteraction({
  name: 'ping',
  async execute() {
    $reply('Pong!')
  },
})
