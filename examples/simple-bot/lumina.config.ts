import process from 'node:process'
import { defineLuminaConfig } from '@lumina/core/config'

export default defineLuminaConfig({
  name: 'simple-bot',

  bot: {
    intents: [],
  },

  runtime: {
    botToken: process.env.LUMINA_BOT_TOKEN,
    devGuild: process.env.LUMINA_DEV_GUILD,
  },
})
