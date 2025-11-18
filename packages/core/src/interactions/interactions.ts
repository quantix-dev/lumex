import type { InteractionContextType } from 'discord.js'
import type { ExtractProps, Props } from './props.ts'

interface BaseInteraction {
  /**
   * @see {@link SlashCommandBuilder.name}
   */
  name: string
}

interface CommandInteraction<T extends Props, PropCtx = ExtractProps<T>> extends BaseInteraction {
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

  /**
   * @see {@link SlashCommandBuilder.options}
   */
  options?: T

  /**
   * The command interaction execute function.
   *
   * @param props The interaction props.
   */
  execute: (props: PropCtx) => Promise<void>
}

interface InteractionGroup extends BaseInteraction {
  subcommands: Array<Interaction<any>>
}

/**
 * Lumex interaction.
 */
type Interaction<T extends Props> = CommandInteraction<T> | InteractionGroup

/**
 * Creates a new interaction for Lumex.
 *
 * @param interaction The interaction configuration.
 * @returns The interaction definition.
 */
export function defineInteraction<T extends Props>(interaction: Interaction<T>): Interaction<T> {
  return interaction
}
