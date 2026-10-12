import * as migration_20261010_120000_products_localization from './20261010_120000_products_localization';
import * as migration_20261010_181046_users_roles from './20261010_181046_users_roles';
import * as migration_20261012_023059 from './20261012_023059';
import * as migration_20261012_034025 from './20261012_034025';
import * as migration_20261012_041000_enable_rls from './20261012_041000_enable_rls';

export const migrations = [
  {
    up: migration_20261010_120000_products_localization.up,
    down: migration_20261010_120000_products_localization.down,
    name: '20261010_120000_products_localization',
  },
  {
    up: migration_20261010_181046_users_roles.up,
    down: migration_20261010_181046_users_roles.down,
    name: '20261010_181046_users_roles',
  },
  {
    up: migration_20261012_023059.up,
    down: migration_20261012_023059.down,
    name: '20261012_023059',
  },
  {
    up: migration_20261012_034025.up,
    down: migration_20261012_034025.down,
    name: '20261012_034025'
  },
  {
    up: migration_20261012_041000_enable_rls.up,
    down: migration_20261012_041000_enable_rls.down,
    name: '20261012_041000_enable_rls'
  },
];
