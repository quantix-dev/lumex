import type { InteractionContextType } from 'discord.js'
import type { ExtractOptions, Options } from './props.ts'

/**
 * Application Command
 * @description Application commands are native ways to interact with apps in the Discord client.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure}
 */
interface ApplicationCommand {
  /**
   * @see {@link SlashCommandBuilder.name}
   */
  name: string

  /**
   * @see {@link SlashCommandBuilder.description}
   */
  description?: string

  /**
   * @see {@link SlashCommandBuilder.contexts}
   */
  contexts?: InteractionContextType[]

  /**
   * @see {@link SlashCommandBuilder.nsfw}
   */
  nsfw?: boolean
}

/**
 * CHAT_INPUT
 * @description Slash commands; a text-based command that shows up when a user types `/`
 */
interface ChatInputCommand<T extends Options> extends ApplicationCommand {
  /**
   * @see {@link SlashCommandBuilder.options}
   */
  options?: T

  /**
   * The command interaction execute function.
   *
   * @param props The interaction props.
   */
  execute: (props: ExtractOptions<T>) => Promise<void>
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
