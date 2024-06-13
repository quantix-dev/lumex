import process from 'node:process'
import { defineLuminaConfig } from 'lumina/config'

export default defineLuminaConfig({
  name: 'simple-bot',
  intents: [],
  runtime: {
    botToken: process.env.LUMINA_BOT_TOKEN,
    devToken: process.env.LUMINA_DEV_TOKEN,
    devGuild: process.env.LUMINA_DEV_GUILD,
  },
})
