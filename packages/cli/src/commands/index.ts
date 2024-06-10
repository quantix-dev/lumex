import type { CommandDef } from 'citty'

interface Subcommand { default: CommandDef<any> }

/**
 * Resolves the command import and returns the definition.
 *
 * @param cmd The command.
 * @returns The definition.
 */
const _cmdDefault = <T extends Subcommand>(cmd: T) => cmd.default

export const commands = {
  build: () => import('./build').then(_cmdDefault),
  dev: () => import('./dev').then(_cmdDefault),
  prepare: () => import('./prepare').then(_cmdDefault),
}
