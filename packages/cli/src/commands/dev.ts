import { env } from 'node:process'
import { defineCommand } from 'citty'
import { consola } from 'consola'

export default defineCommand({
  meta: {
    name: 'dev',
    description: 'Runs the bot in development mode with HMR.',
  },
  args: {
    cwd: {
      type: 'string',
      description: 'Current working directory',
    },
  },
  run() {
    env.NODE_ENV = 'development'
    consola.info('Starting development build.')
  },
})
