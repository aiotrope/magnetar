import { postgres, load } from '../deps.js';

const env = await load();

const sql = postgres({});

/* const sql = postgres({
  host: env['POSTGRES_HOST'],
  username: env['POSTGRES_USER'],
  password: env['POSTGRES_PASSWORD'],
  database: env['POSTGRES_DB'],
  port: env['POSTGRES_PORT'],
  max: 2,
}); */


export { sql };
