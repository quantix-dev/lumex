import { env } from 'node:process'
import { defineCommand } from 'citty'

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
  },
})
