import process from 'node:process'
import { defineLumexConfig } from 'lumex/config'

export default defineLumexConfig({
  name: 'simple-bot',

  bot: {
    intents: [],
  },

  runtime: {
    botToken: process.env.LUMEX_BOT_TOKEN,
    devToken: process.env.LUMEX_DEV_TOKEN,
    devGuild: process.env.LUMEX_DEV_GUILD,
  },
})
