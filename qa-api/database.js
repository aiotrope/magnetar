import { postgres } from './deps.js';

const PGPASS = Deno.env.get('PGPASS').trim();
const PGPASS_PARTS = PGPASS.split(':');

const host = PGPASS_PARTS[0];
const port = PGPASS_PARTS[1];
const database = PGPASS_PARTS[2];
const username = PGPASS_PARTS[3];
const password = PGPASS_PARTS[4];

const sql = postgres({
  host,
  port,
  database,
  username,
  password,
});

export { sql };



//* FOR DOCKCOMPOSE CONFIG. Uncomment/comment depending on environment usage

//* import { postgres, load } from '../deps.js';
//* const env = await load();
//* const sql = postgres({}); // for w/o env. vars
//* If using env. var 
/* const sql = postgres({
  host: env['POSTGRES_HOST'],
  username: env['POSTGRES_USER'],
  password: env['POSTGRES_PASSWORD'],
  database: env['POSTGRES_DB'],
  port: env['POSTGRES_PORT'],
  max: 2,
}); */
//* export { sql };
