import { Queue } from "bullmq";
import { RedisOptions } from "ioredis";

const redisUrl = process.env.REDIS_URL!;
const { hostname: host, port } = new URL(redisUrl);
const connection: RedisOptions = { host, port: Number(port) };

export const messageQueue = new Queue("chat-messages", { connection });
