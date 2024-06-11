import { env } from 'node:process'
import { defineCommand } from 'citty'
import { consola } from 'consola'

export default defineCommand({
  meta: {
    name: 'build',
    description: 'Builds the bot for use in production.',
  },
  args: {
    cwd: {
      type: 'string',
      description: 'Current working directory',
    },
  },
  run() {
    env.NODE_ENV = 'production'
    consola.info('Starting production build.')
  },
})
