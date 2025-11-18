import type { InputConfig } from 'c12'
import type { ClientOptions } from 'discord.js'
import type { SnakeCase } from 'scule'
import { createDefineConfig } from 'c12'

type UpperSnakeCase<T extends string> = Uppercase<SnakeCase<T>>

const hint = Symbol('hint')
type EnvValue<T, Path extends string, K extends string> = T & { [hint]?: `You can override this value with LUMEX${Path}_${UpperSnakeCase<K>}` }
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

interface RuntimeConfig {
  /**
   * The bot token.
   */
  botToken?: string

  /**
   * The development bot token.
   * @default botToken
   */
  devToken?: string

  /**
   * The development guild.
   */
  devGuild?: string
}

interface _LumexConfig {
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
 * Configuration for the Lumex library.
 */
export type LumexConfig = InputConfig<_LumexConfig>

/**
 * Define Lumex config.
 */
export const defineLumexConfig = createDefineConfig<_LumexConfig>()
