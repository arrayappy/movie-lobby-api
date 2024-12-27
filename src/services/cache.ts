import { createClient } from 'redis';

let client: any = null;

export const initializeCache = async () => {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    client.on('error', (err: Error) => console.error('Redis Client Error', err));
    await client.connect();
  }
  return client;
};

export const getCache = async (key: string): Promise<string | null> => {
  if (!client) return null;
  return await client.get(key);
};

export const setCache = async (key: string, value: string | null, expiry = 3600): Promise<void> => {
  if (!client) return;
  await client.setEx(key, expiry, value);
};