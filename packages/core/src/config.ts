import type { BitFieldResolvable, GatewayIntentsString } from 'discord.js'

interface Config {
  /**
   * The name of the bot.
   */
  name: string

  /**
   * Discord intents to enable for this connection.
   */
  intents: BitFieldResolvable<GatewayIntentsString, number>
}

export function defineConfig(_config: Config) {
  return _config
}
