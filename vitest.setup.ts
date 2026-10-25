// Setup vitest (unit + int). Dimuat sekali per worker SEBELUM spec mengimpor
// payload.config, jadi guard di sini menjalan sebelum koneksi DB dibuat.

import { existsSync } from 'node:fs'
import { config as loadEnv } from 'dotenv'

// DOTENV_CONFIG_PATH (diset script test:int/test:unit) menunjuk test.env -
// pisahkan dari .env agar DATABASE_URL prod di .env tidak pernah dipakai test.
// Tanpa DOTENV_CONFIG_PATH (run vitest mentah) -> fallback .env seperti biasa.
const envPath = process.env.DOTENV_CONFIG_PATH
if (envPath) {
  loadEnv({ path: envPath })
} else {
  loadEnv({})
}

// Guard 1: test.env wajib ada untuk test:int di luar CI (CI sediakan env sendiri).
if (!process.env.CI && process.env.TEST_ENV_REQUIRED === '1') {
  if (!envPath || !existsSync(envPath)) {
    throw new Error(
      `test.env tidak ditemukan (${envPath ?? '(tidak diset)'}). ` +
        'Test integrasi butuh DB lokal: salin test.env.example -> test.env, ' +
        'lalu nyalakan Postgres lokal. Lihat RUNBOOK-MANUAL-HARDENING (DB test lokal). ' +
        'Untuk test tanpa DB: pnpm test:unit.',
    )
  }
}

// Guard 2: dilarang lawan DB remote/prod. Spec int menulis fixture (create/
// update/delete posts, products, USERS) dan init Payload menarik skema (DDL).
const dbUrl = process.env.DATABASE_URL ?? ''
let host = ''
try {
  host = new URL(dbUrl).hostname
} catch {
  host = ''
}
const localHosts = new Set(['localhost', '127.0.0.1', '::1', 'postgres', 'host.docker.internal'])
if (!process.env.CI && dbUrl !== '' && !localHosts.has(host)) {
  throw new Error(
    `DATABASE_URL menunjuk "${host || '(URL tidak valid)'}" - test integrasi ` +
      'menulis fixture + DDL dan dilarang berjalan lawan DB remote/prod. ' +
      'Set DATABASE_URL lokal di test.env (salin dari test.env.example). ' +
      'Untuk test tanpa DB: pnpm test:unit.',
  )
}
