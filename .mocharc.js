'use strict';

module.exports = {
  diff: true,
  extension: ['ts'],
  reporter: 'spec',
  recursive: true,
  require: ['ts-node/register', 'test/mocha.require.ts'],
  spec: 'src/**/*.spec.ts',
  watch: false
}
