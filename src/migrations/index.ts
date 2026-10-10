import * as migration_20261010_104106_products_localization from './20261010_104106_products_localization';

export const migrations = [
  {
    up: migration_20261010_104106_products_localization.up,
    down: migration_20261010_104106_products_localization.down,
    name: '20261010_104106_products_localization'
  },
];
