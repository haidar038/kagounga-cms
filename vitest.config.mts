import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    // int: butuh Postgres hidup; unit (T-M15-10): murni, aman paralel.
    include: ['tests/int/**/*.int.spec.ts', 'tests/unit/**/*.spec.ts'],
    // Serial selalu: tiap worker mem-push skema saat init Payload - paralel
    // adu CREATE TYPE/TABLE di DB kosong (D-022). Total 25 test, murah.
    maxWorkers: 1,
  },
})
