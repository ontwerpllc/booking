import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
    },
    reporters: ['default', 'html', 'junit'],
    outputFile: {
      junit: 'coverage/junit.xml',
    },
  },
});
