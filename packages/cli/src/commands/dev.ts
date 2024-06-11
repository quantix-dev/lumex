import { env } from 'node:process'
import { consola } from 'consola'
import { defineCommand } from 'citty'

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
