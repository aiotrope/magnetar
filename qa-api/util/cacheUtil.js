import { connect, parseURL } from '../deps.js';

const url = Deno.env.get('REDIS_URL');
const parsed = parseURL(url);

//* console.log('REDIS URL', parsed)

const redis = await connect({
  hostname: parsed?.hostname,
  port: parsed?.port,
  name: parsed?.name,
  password: parsed?.password,
  db: parsed?.db,
  tls: parsed?.tls,
});

const cacheMethodCalls = (object, methodsToFlushCacheWith = []) => {
  const handler = {
    get: (module, methodName) => {
      const method = module[methodName];
      return async (...methodArgs) => {
        if (methodsToFlushCacheWith.includes(methodName)) {
          await redis.flushdb();
          return await method.apply(this, methodArgs);
        }

        const cacheKey = `${methodName}-${JSON.stringify(methodArgs)}`;
        const cacheResult = await redis.get(cacheKey);
        if (!cacheResult) {
          const result = await method.apply(this, methodArgs);
          await redis.set(cacheKey, JSON.stringify(result));
          return result;
        }

        return JSON.parse(cacheResult);
      };
    },
  };

  return new Proxy(object, handler);
};

export { cacheMethodCalls };
