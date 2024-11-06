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
type PropType =
  | AttachmentProp
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

type Props = Record<string, Prop>

/**
 * Utility to extract types from props definition.
 */
type ExtractProps<T extends Props> = {
  [K in keyof T]: T[K]['type'] extends AttachmentProp
    ? DiscordAttachment
    : T[K]['type'] extends BooleanConstructor
      ? boolean
      : T[K]['type'] extends ChannelProp
        ? DiscordChannel
        : T[K]['type'] extends NumberConstructor
          ? number
          : T[K]['type'] extends RoleProp
            ? DiscordRole
            : T[K]['type'] extends StringConstructor
              ? string
              : T[K]['type'] extends UserProp
                ? DiscordUser
                : never
}

/**
 * Lumex interaction.
 */
interface Interaction<T extends Props, PropCtx extends Record<keyof T, unknown> = ExtractProps<T>> {
  /**
   * @see {@link SlashCommandBuilder.name}
   */
  name: string

  /**
   * @see {@link SlashCommandBuilder.description}
   */
  description?: string

  /**
   * @see {@link SlashCommandBuilder.dm_permission}
   */
  dm?: boolean

  /**
   * @see {@link SlashCommandBuilder.options}
   */
  options?: T

  /**
   *
   * @param props
   * @returns
   */
  execute: (props: PropCtx) => Promise<void> | void
}

/**
 * Creates a new interaction for Lumex.
 *
 * @param interaction The interaction configuration.
 * @returns The interaction definition.
 */
export function defineInteraction<T extends Props>(interaction: Interaction<T>) {
  return interaction
}
