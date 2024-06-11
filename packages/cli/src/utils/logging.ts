import process from 'node:process'
import { consola } from 'consola'

/**
 * Intercept console messages with consola to provide a
 * more readable output.
 *
 * @param isDev If the context is in development.
 */
export default function setupLogging(isDev?: boolean) {
  if (isDev === true) {
    consola.wrapAll()
  }
  else {
    consola.wrapConsole()
  }

  process.on('uncaughtException', err => consola.error('[uncaughtException]:', err))
  process.on('unhandledRejection', err => consola.error('[unhandledRejection]:', err))
}
