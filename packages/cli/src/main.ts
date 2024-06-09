import { defineCommand } from 'citty'
import { description, name, version } from '../package.json' assert { type: 'json' }

// eslint-disable-next-line ts/no-unsafe-assignment
export const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  async setup(_ctx) {
  },
}) as any // required to resolve an issue with building. looks like cjs plugin is trying to build the .d.ts files for citty
