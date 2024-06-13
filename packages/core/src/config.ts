import type { ClientOptions } from 'discord.js'

type UpperSnakeCase<T extends string> = Uppercase<T>

const hint = Symbol('hint')
type EnvValue<T, Path extends string, K extends string> = T & { [hint]?: `You can override this value with LUMINA${Path}_${UpperSnakeCase<K>}` }
type EnvConfig<T extends Record<string, any>, Path extends string = ''> = {
  [K in keyof T]?: K extends string
    ? unknown extends T[K]
      ? unknown
      : T[K] extends Record<string, unknown>
        ? EnvValue<EnvConfig<T[K], `${Path}_${UpperSnakeCase<K>}`>, Path, K>
        : EnvValue<T[K], Path, K>
    : K extends number
      ? T[K]
      : never
}

export interface RuntimeConfig {
  /**
   * The production bot token.
   */
  botToken: string

  /**
   * The development bot token.
   * Uses the {@link RuntimeConfig.botToken | botToken} if a value is not provided.
   */
  devToken?: string

  /**
   * The development guild.
   */
  devGuild?: string

  /**
   * The public values accessible from interactions, plugins, etc.
   */
  public?: Record<string, any>
}

export interface LuminaConfig {
  /**
   * The name of the bot.
   */
  name: string

  /**
   * Discord intents to enable for this connection.
   * @see {@link https://discord.com/developers/docs/topics/gateway#list-of-intents}
   */
  intents: ClientOptions['intents']

  /**
   * Runtime bot configuration.
   */
  runtime: EnvConfig<RuntimeConfig>
}

/**
 * Define Lumina config.
 */
export function defineLuminaConfig(config: LuminaConfig) {
  return config
}
