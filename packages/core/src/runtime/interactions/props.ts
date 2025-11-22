import type { Attachment as DiscordAttachment, Channel as DiscordChannel, Role as DiscordRole, User as DiscordUser } from 'discord.js'

// Non primitive djs prop types
export const Attachment = Symbol('attachment')
type AttachmentProp = typeof Attachment

export const Channel = Symbol('channel')
type ChannelProp = typeof Channel

export const Role = Symbol('role')
type RoleProp = typeof Role

export const User = Symbol('user')
type UserProp = typeof User

/**
 * Valid option types for discord.js
 */
type PropType
  = | AttachmentProp
    | BooleanConstructor
    | ChannelProp
    | NumberConstructor
    | RoleProp
    | StringConstructor
    | UserProp

/**
 * Lumex interaction prop.
 */
interface Prop {
  type: PropType
  description?: string
  required?: boolean
}

export type Props = Record<string, Prop>

// Retrieves the required props from a Props object.
type RequiredProps<T extends Props> = { [K in keyof T]: T[K] extends { required: true } ? K : never }[keyof T]
type OptionalProps<T extends Props> = Exclude<keyof T, RequiredProps<T>>

type DeterminePropType<T extends Prop> = T['type'] extends AttachmentProp
  ? DiscordAttachment
  : T['type'] extends BooleanConstructor
    ? boolean
    : T['type'] extends ChannelProp
      ? DiscordChannel
      : T['type'] extends NumberConstructor
        ? number
        : T['type'] extends RoleProp
          ? DiscordRole
          : T['type'] extends StringConstructor
            ? string
            : T['type'] extends UserProp
              ? DiscordUser
              : never

/**
 * Utility to extract types from props definition.
 */
export type ExtractProps<T extends Props> = {
  [K in keyof Pick<T, RequiredProps<T>>]: DeterminePropType<T[K]>
} & {
  [K in keyof Pick<T, OptionalProps<T>>]?: DeterminePropType<T[K]>
}
