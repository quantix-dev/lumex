import { defineCommand } from 'citty'

export default defineCommand({
  meta: {
    name: 'prepare',
    description: 'Generates type stubs for development.',
  },
  args: {
    cwd: {
      type: 'string',
      description: 'Current working directory',
    },
  },
  run() {
  },
})
