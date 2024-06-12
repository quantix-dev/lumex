/* eslint-disable ts/no-unsafe-call  */
export default defineCommand({
  name: 'ping',
  description: 'Pings the bot and returns the response time.',
  execute() {
    $reply('Pong!')
  },
})
