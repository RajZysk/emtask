const _dirConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'zysk',
  password: '1234',
  database: 'zysk',
  logging: true,
  entities: ['dist/src/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};
module.exports = _dirConfig;
