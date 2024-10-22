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

/**
 * Runtime configuration values.
 */
export interface RuntimeConfig {
  /**
   * The bot token.
   */
  botToken?: string

  /**
   * The development guild(s).
   */
  devGuild?: string | string[]

  /**
   * The public values accessible from interactions, plugins, etc.
   */
  public?: Record<string, any>
}

/**
 * Configuration for the lumina library.
 */
export interface LuminaConfig {
  /**
   * The name of the bot.
   */
  name: string

  /**
   * Discord client options.
   */
  bot: Omit<ClientOptions, 'makeCache' | 'presence' | 'jsonTransformer'>

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
