import { loadDotenv } from 'c12'
import { consola } from 'consola'
import { Client } from 'discord.js'

// TODO: inject lumex config as constant at build

// TODO: load runtime config

// Create client
const client = new Client({ intents: [] })
client.once('ready', () => consola.success('client ready'))

// TODO: Load runtime config fully.
// TODO: Runtime config is set using build time value but can be overriden with env.
loadDotenv({})
  .then(env => client.login(env.LUMEX_BOT_TOKEN))
