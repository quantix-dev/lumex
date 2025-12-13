import type { InteractionContextType, Permissions, SlashCommandBuilder } from 'discord.js'
import type { ExtractOptions, Options } from './props.ts'

/**
 * Application Command
 * @description Application commands are native ways to interact with apps in the Discord client.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure}
 */
interface ApplicationCommand {
  /**
   * name
   * @description {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming|Name of command}, 1-32 characters.
   * @see {@link SlashCommandBuilder.name}
   */
  name: string

  /**
   * default_member_permissions
   * @description Set of {@link https://discord.com/developers/docs/topics/permissions|permissions} represented as a bit set.
   * @see {@link SlashCommandBuilder.default_member_permissions}
   */
  defaultMemberPermissions?: Permissions

  /**
   * contexts
   * @description {@link https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-context-types|Interaction context(s)} where the command can be used, only for globally-scoped commands.
   * @see {@link SlashCommandBuilder.contexts}
   */
  contexts?: InteractionContextType[]

  /**
   * nsfw
   * @description Indicates whether the command is {@link https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands|age-restricted}.
   * @see {@link SlashCommandBuilder.nsfw}
   * @default false
   */
  nsfw?: boolean
}

/**
 * CHAT_INPUT
 * @description Slash commands; a text-based command that shows up when a user types `/`.
 */
interface ChatInputCommand<T extends Options, Extracted = ExtractOptions<T>> extends ApplicationCommand {
  /**
   * description
   * @description Description for `CHAT_INPUT` commands, 1-100 characters.
   * @see {@link SlashCommandBuilder.description}
   */
  description?: string

  /**
   * options
   * @description Parameters for the command, max of 25.
   * @see {@link SlashCommandBuilder.options}
   */
  options?: T

  /**
   * The slash command interaction execute function.
   * @description Parameters for the command.
   * @param options The interaction options.
   */
  execute: (options: Extracted) => Promise<void>
}

/**
 * SUB_COMMAND_GROUP
 * @description Subcommand Groups organize your subcommands by grouping subcommands by similar action or resource within a command.
 */
interface SubCommandGroup extends ApplicationCommand {
  subcommands: Array<ChatInputCommand<any>>
}

/**
 * Lumex interaction.
 */
type Interaction<T extends Options> = ChatInputCommand<T> | SubCommandGroup

/**
 * Creates a new interaction for Lumex.
 * @param interaction The interaction configuration.
 * @returns The interaction definition.
 */
export function defineInteraction<T extends Options>(interaction: Interaction<T>): Interaction<T> {
  return interaction
}
