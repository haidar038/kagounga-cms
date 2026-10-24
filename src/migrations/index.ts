import * as migration_20261024_000000_baseline from './20261024_000000_baseline';

/**
 * Baseline squash (T-M15-12/D-035): satu-satunya migrasi aktif.
 *
 * CATATAN RUNTIME: Payload menjalankan SEMUA file .ts di folder ini (sorted,
 * `index.ts` diabaikan - lihat `payload/dist/database/migrations/
 * readMigrationFiles.js`). Karena itu 8 file migrasi lama (M2–M14) dipindah
 * ke `history/` sebagai arsip: mereka asumsikan dev-push awal (tipe enum
 * `_locales` dsb.) sehingga tak replayable dari DB kosong. Baseline
 * idempoten: DB kosong dibangun penuh; DB existing di-skip (hanya RLS).
 */
export const migrations = [
  {
    up: migration_20261024_000000_baseline.up,
    down: migration_20261024_000000_baseline.down,
    name: '20261024_000000_baseline',
  },
];
