import type { ApplicationCommandOptionChoiceData, Attachment, Channel, ChannelType, GuildMember, Role, User } from 'discord.js'

// Available option types
export enum PropType {
  Attachment,
  Boolean,
  Channel,
  Mentionable,
  Number,
  Role,
  String,
  User,
}

// #region Base Types

/**
 * Application Command Option
 * @description Parameters for the command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure}
 */
interface CommandOption {
  /**
   * type
   * @description Type of option.
   */
  type: PropType

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
interface AutocompleteOption<Value extends string | number> extends CommandOption {
  autocomplete?: (value: Value) => Value[] | Promise<Value[]>
}

/**
 * choices
 * @description Application Command Option with set choices.
 */
interface ChoicesOption<Value extends string | number> extends CommandOption {
  /**
   * choices
   * @description Choices for the user to pick from, max 25.
   */
  choices?: ApplicationCommandOptionChoiceData<Value>
}

/**
 * Primitive options support autocomplete and choices.
 */
type PrimitiveOption<Value extends string | number> = AutocompleteOption<Value> | ChoicesOption<Value>

// #endregion

// #region Option Types

/**
 * ATTACHMENT
 * @description {@link https://discord.com/developers/docs/resources/message#attachment-object|attachment} object.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 */
interface AttachmentOption extends CommandOption {
  type: PropType.Attachment
}

/**
 * BOOLEAN
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 */
interface BooleanOption extends CommandOption {
  type: PropType.Boolean
}

/**
 * CHANNEL
 * @description Includes all channel types + categories.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 */
interface ChannelOption extends CommandOption {
  type: PropType.Channel

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
interface MentionableOption extends CommandOption {
  type: PropType.Mentionable
}

/**
 * NUMBER
 * @description Any number between -2^53 and 2^53.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 */
type NumberOption = PrimitiveOption<number> & {
  type: PropType.Number

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
interface RoleOption extends CommandOption {
  type: PropType.Role
}

/**
 * STRING
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
 */
type StringOption = PrimitiveOption<string> & {
  type: PropType.String

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
interface UserOption extends CommandOption {
  type: PropType.User
}

// #endregion

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

// Determine the runtime type for a DJS option.
type DetermineOptionType<T extends Option> = T['type'] extends PropType.Attachment
  ? Attachment
  : T['type'] extends PropType.Boolean
    ? boolean
    : T['type'] extends PropType.Channel
      ? Channel
      : T['type'] extends PropType.Mentionable
        ? GuildMember | Role | User
        : T['type'] extends PropType.Number
          ? number
          : T['type'] extends PropType.Role
            ? Role
            : T['type'] extends PropType.String
              ? string
              : T['type'] extends PropType.User
                ? GuildMember | User
                : never

// Options object
export type Options = Record<string, Option>
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
