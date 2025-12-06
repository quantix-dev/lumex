import { env } from 'node:process'
import { intro, outro } from '@clack/prompts'
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
    const lumex = await core.loadLumex(cwd)

    // Start build
    await core.build(lumex)
    outro('Build successfully completed.')
  },
})
