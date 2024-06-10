import { defineCommand } from 'citty'
import { description, name, version } from '../package.json' assert { type: 'json' }
import { commands as subCommands } from './commands'

// eslint-disable-next-line ts/no-unsafe-assignment
export const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  subCommands,
  async setup(_ctx) {
  },
}) as any // required to resolve an issue with building. looks like cjs plugin is trying to build the .d.ts files for citty
