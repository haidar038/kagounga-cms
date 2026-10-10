import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/int/**/*.int.spec.ts'],
    // CI: DB service kosong; dev-push 4 file paralel adu CREATE TYPE/TABLE.
    // Serial via env (GitHub set CI=true otomatis) — lokal tetap paralel.
    // CLI `-- --maxWorkers` tak bisa di sini (pnpm teruskan `--` mentah).
    maxWorkers: process.env.CI ? 1 : undefined,
  },
})
