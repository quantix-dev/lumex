import { env } from 'node:process'
import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'build',
    description: '',
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
