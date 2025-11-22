import { env } from 'node:process'
import { intro } from '@clack/prompts'
import { defineCommand } from 'citty'
import { importLumex } from '../utils/resolve.ts'

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
  async run({ args: { cwd } }) {
    env.NODE_ENV = 'production'
    intro('Started production build.')

    // Load lumex
    const core = await importLumex(cwd)
    const lumex = core.loadLumex(cwd)

    // Start build
    core.build(lumex)
  },
})
