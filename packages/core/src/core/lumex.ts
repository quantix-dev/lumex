import type { LumexConfig } from '../config.ts'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadConfig } from 'c12'

export interface Lumex {
  runtimeDir: string
  options: LumexConfig
}

/**
 * Loads and creates a new lumex instance.
 *
 * @param cwd The current working directory.
 * @returns The lumex instance.
 */
export async function loadLumex(cwd?: string): Promise<Lumex> {
  const { config } = await loadConfig<LumexConfig>({
    name: 'lumex',
    configFile: 'lumex.config',
    cwd,
    dotenv: true,
  })

  const lumex: Lumex = {
    runtimeDir: dirname(fileURLToPath(import.meta.url)),
    options: config,
  }

  return lumex
}
