import type {
  ApplicationCommandOptionChoiceData,
  ChannelType,
  Attachment as DiscordAttachment,
  Channel as DiscordChannel,
  GuildMember as DiscordMember,
  Role as DiscordRole,
  User as DiscordUser,
} from 'discord.js'

/**
 * Application Command Option
 * @description Parameters for the command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure}
 */
interface CommandOption<T, _Value> {
  /**
   * type
   * @description Type of option.
   */
  type: T

  /**
   * description
   * @description 1-100 character description.
   */
  description: string

  /**
   * required
   * @description Whether the parameter is required or optional.
   * @default false
   */
  required?: boolean
}

/**
 * autocomplete
 * @description Application Command Option that supports Autocomplete.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#autocomplete}
 */
interface AutocompleteOption<T, Value> extends CommandOption<T, Value> {
  autocomplete?: (value: Value) => Value[]
}

/**
 * choices
 * @description Application Command Option with set choices.
 */
interface ChoicesOption<T, Value extends string | number> extends CommandOption<T, Value> {
  /**
   * choices
   * @description Choices for the user to pick from, max 25.
   */
  choices?: ApplicationCommandOptionChoiceData<Value>
}

type PrimitiveOption<T, Value extends string | number> = AutocompleteOption<T, Value> | ChoicesOption<T, Value>

/**
 * ATTACHMENT
 * @description {@link https://discord.com/developers/docs/resources/message#attachment-object|attachment} object.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 */
export const Attachment = Symbol('attachment')
type AttachmentOption = CommandOption<typeof Attachment, DiscordAttachment>

/**
 * BOOLEAN
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 */
type BooleanOption = CommandOption<BooleanConstructor, boolean>

/**
 * CHANNEL
 * @description Includes all channel types + categories.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 */
export const Channel = Symbol('channel')
interface ChannelOption extends CommandOption<typeof Channel, DiscordChannel> {
  /**
   * channel_types
   * @description The channels shown will be restricted to these types.
   */
  channelTypes?: ChannelType[]
}

/**
 * MENTIONABLE
 * @description Includes users and roles.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 */
export const Mentionable = Symbol('mentionable')
type MentionableOption = CommandOption<typeof Mentionable, DiscordMember | DiscordRole | DiscordUser>

/**
 * NUMBER
 * @description Any number between -2^53 and 2^53.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 */
type NumberOption = PrimitiveOption<NumberConstructor, number> & {
  /**
   * min_value
   * @description The minimum value permitted
   */
  minValue?: number

  /**
   * max_value
   * @description The maximum value permitted
   */
  maxValue?: number
}

/**
 * ROLE
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 */
export const Role = Symbol('role')
type RoleOption = CommandOption<typeof Role, DiscordRole>

/**
 * STRING
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 */
type StringOption = PrimitiveOption<StringConstructor, string> & {
  /**
   * min_length
   * @description The minimum allowed length. (minimum of `0`, maximum of `6000`)
   */
  minLength?: number

  /**
   * max_length
   * @description The maximum allowed length. (minimum of `1`, maximum of `6000`)
   */
  maxLength?: number
}

/**
 * USER
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 */
export const User = Symbol('user')
type UserOption = CommandOption<typeof User, DiscordMember | DiscordUser>

// Application Command Option
type Option
  = | AttachmentOption
    | BooleanOption
    | ChannelOption
    | MentionableOption
    | NumberOption
    | RoleOption
    | StringOption
    | UserOption

// Application Command Options
export type Options = Record<string, Option>

// Determine the runtime type for a DJS option.
type DetermineOptionType<T extends Option> = T extends CommandOption<any, infer B> ? B : never

// Retrieves the required and optional options from a Options object.
type RequiredOptions<T extends Options> = { [K in keyof T]: T[K] extends { required: true } ? K : never }[keyof T]
type OptionalOptions<T extends Options> = Exclude<keyof T, RequiredOptions<T>>

/**
 * Utility to extract types from options definition.
 */
export type ExtractOptions<T extends Options> = {
  [K in keyof Pick<T, RequiredOptions<T>>]: DetermineOptionType<T[K]>
} & {
  [K in keyof Pick<T, OptionalOptions<T>>]?: DetermineOptionType<T[K]>
}
