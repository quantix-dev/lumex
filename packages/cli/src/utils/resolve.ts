import { resolveModuleURL } from 'exsolve'

/**
 * Finds and imports the local lumex module.
 *
 * @param cwd The current working directory.
 * @returns The lumex module.
 */
export async function importLumex(cwd?: string) {
  // Try finding module
  const path = resolveModuleURL('lumex', { try: true, from: cwd })
  if (!path) {
    throw new Error('`@lumex/cli` requires `lumex` to be installed in your project.')
  }

  return await import(path) as typeof import('lumex')
}
