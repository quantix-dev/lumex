import type { CommandDef } from 'citty'

/**
 * Resolves the command import and returns the definition.
 *
 * @param cmd The imported command.
 * @param cmd.default The default export of the command.
 * @returns The imported command definition.
 */
const _cmdDefault = <T extends CommandDef<any>>(cmd: { default: T }) => cmd.default

/**
 * Executable commands.
 */
export const commands = {
  build: () => import('./build').then(_cmdDefault),
  dev: () => import('./dev').then(_cmdDefault),
  prepare: () => import('./prepare').then(_cmdDefault),
} as const
