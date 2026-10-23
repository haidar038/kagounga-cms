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
    // CI: DB service kosong; dev-push 4 file paralel adu CREATE TYPE/TABLE.
    // Serial via env (GitHub set CI=true otomatis) — lokal tetap paralel.
    // CLI `-- --maxWorkers` tak bisa di sini (pnpm teruskan `--` mentah).
    maxWorkers: process.env.CI ? 1 : undefined,
  },
})
