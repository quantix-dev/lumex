import { env } from 'node:process'
import { defineCommand } from 'citty'
import { importLumex } from '../utils/resolve.ts'

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
  async run({ args: { cwd } }) {
    env.NODE_ENV = 'development'

    // Load lumex
    const core = await importLumex(cwd)
    const lumex = await core.loadLumex(cwd)

    // Start build
    await core.build(lumex)
  },
})
