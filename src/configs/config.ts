export default () => ({
  app: {
    port: 33000,
  },
  db: {
    host: 'localhost',
    port: 5432,
    database: 'metabudget',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    secret_key: process.env.JWT_SECRET_KEY,
    life_time: '3600s',
  },
  crypt: {
    salt: 10,
  },
});