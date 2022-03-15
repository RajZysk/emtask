const _dirConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'raj123',
  database: 'emtask',
  entities: ['dist/entities/*.entity.js'],
  migrations: ['dist/migration/*.js'],
  cli: {
    migrationsDir: 'migration',
  },
};
module.exports = _dirConfig;
