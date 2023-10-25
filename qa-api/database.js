import { postgres } from './deps.js';

const sql = postgres({
  host: Deno.env.get('PGHOST'),
  username: Deno.env.get('PGUSER'),
  password: Deno.env.get('PGPASSWORD'),
  database: Deno.env.get('PGDATABASE'),
  port: Deno.env.get('PGPORT'),
  max: 2,
});

export { sql };
