import process from 'node:process'
import { defineLumexConfig } from '@lumex/core/config'

export default defineLumexConfig({
  name: 'simple-bot',

  bot: {
    intents: [],
  },

  runtime: {
    botToken: process.env.LUMEX_BOT_TOKEN,
    devGuild: process.env.LUMEX_DEV_GUILD,
  },
})
