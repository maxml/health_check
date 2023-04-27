import Redis from "ioredis";
import { Defaults, HTTPChecker, IntegrationConfig } from "../interfaces/types";

export async function checkRedisClient(config: IntegrationConfig): Promise<HTTPChecker> {
  return new Promise((resolve, _) => {
    const client = new Redis(config.port || 6379, config.host, {
      db: config.db || 0,
      password: config.auth?.password,
      connectTimeout: config.timeout || Defaults.RedisTimeout,
      tls: {
        rejectUnauthorized: false,
      },
    });
    client.on("error", (error: any) => {
      console.log(error);
      
      client.disconnect();
      resolve({
        status: false,
        error,
      });
    });

    client.ping((status) => {
      client.disconnect();
      resolve({
        status: status === null,
        error: status !== null ? status : undefined,
      });
    });
  });
}
