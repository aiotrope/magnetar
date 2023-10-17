import { load } from 'https://deno.land/std/dotenv/mod.ts';
import { Application, Router } from 'https://deno.land/x/oak@v12.6.1/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import postgres from 'https://deno.land/x/postgresjs@v3.3.5/mod.js';
import { createClient } from 'npm:redis@4.6.4';

export { postgres, load, Application, Router, oakCors, createClient };
