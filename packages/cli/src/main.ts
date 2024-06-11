import { defineCommand } from 'citty'
import { description, name, version } from '../package.json' assert { type: 'json' }
import { commands as subCommands } from './commands'
import setupLogging from './utils/logging'

export const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  subCommands,
  async setup(_ctx) {
    setupLogging(_ctx.args._?.[0] === 'dev')
  },
})
