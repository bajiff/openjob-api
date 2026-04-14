/* eslint-disable camelcase */

export const shorthands = undefined;

export const up = (pgm) => {
  // Mantra untuk MEMBANGUN rak
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    fullname: {
      type: 'TEXT',
      notNull: true,
    },
    email: {
      type: 'VARCHAR(100)',
      notNull: true,
      unique: true, // Syarat Skilled: Unique constraint 
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

export const down = (pgm) => {
  // Mantra untuk MENGHANCURKAN rak (jika ada kesalahan)
  pgm.dropTable('users');
};