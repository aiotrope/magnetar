// import { serve } from 'https://deno.land/std@0.178.0/http/server.ts';
import { Application, Router } from 'https://deno.land/x/oak@v12.6.1/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';
import postgres from 'https://deno.land/x/postgresjs@v3.3.5/mod.js';
import { connect } from 'https://deno.land/x/redis@v0.29.0/mod.ts';
import { load } from 'https://deno.land/std/dotenv/mod.ts';
import { pLimit } from 'https://deno.land/x/p_limit@v1.0.0/mod.ts';
// import { createClient } from 'npm:redis@4.6.4';

export { postgres, connect, load, Application, Router, oakCors, pLimit };

