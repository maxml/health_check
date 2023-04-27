import { Client, ClientConfig } from "pg";
import { HTTPChecker, IntegrationConfig } from "../interfaces/types";

export async function checkDatabaseClient(config: IntegrationConfig): Promise<HTTPChecker> {
  return new Promise(async (resolve, _) => {
    // init postgres db
    const dbConfig: ClientConfig = {
      user: config.dbUser,
      database: config.dbName,
      password: config.dbPwd,
      port: config.dbPort,
      host: config.host,
      ssl: {
        rejectUnauthorized: false,
      },
    };
    const db = new Client(dbConfig);
    // check authenticate to database
    try {
      await db.connect();
      await db.end();
      resolve({
        status: true,
      });
    } catch (error) {
      resolve({
        status: false,
        error,
      });
    }
  });
}
