# nodejs-health-checker

This is a Node package that allows you to track the health of your application, providing two ways of checking:

_**Simple**_: will respond to a JSON as below and that allows you to check if your application is online and responding without checking any kind of integration.

```json
{
  "status": "fully functional"
}
```

_**Detailed**_: will respond a JSON as below and that allows you to check if your application is up and running and check if all of your integrations informed in the configuration list is up and running.

```json
{
  "name": "My node application",
  "version": "my version",
  "status": true,
  "date": "2020-09-18T15:29:41.616Z",
  "duration": 0.523,
  "integrations": [
    {
      "name": "redis integration",
      "kind": "Redis DB integration",
      "status": true,
      "response_time": 0.044,
      "url": "redis:6379"
    },
    {
      "name": "my web api integration",
      "kind": "Web integrated API",
      "status": true,
      "response_time": 0.511,
      "url": "https://github.com/status"
    }
  ]
}
```

## Available integrations

- [x] Redis
- [x] Web integration (https)
- [x] Database (PostgreSQL)
- [x] Custom integration support

## How to use

Example using Nodejs + Express

```javascript
import express from "express";
import { HealthcheckerDetailedCheck, HealthcheckerSimpleCheck } from "./healthchecker/healthchecker";
import { Dialects, HealthTypes } from "./interfaces/types";

const server = express();

server.get("/health-check/liveness", (_, res) => {
  res.send(HealthcheckerSimpleCheck());
});

server.get("/health-check/readiness", async (_, res) => {
  res.send(
    await HealthcheckerDetailedCheck({
      name: "My node application",
      version: "my version",
      // here you will inform all of your external dependencies
      // that your application must be checked to keep healthy
      // available integration types: [
      //   HealthTypes.Redis,
      //   HealthTypes.Web
      //   HealthTypes.Custom
      // ]
      integrations: [
        {
          type: HealthTypes.Redis,
          name: "redis integration",
          host: "redis",
        },
        {
          type: HealthTypes.Web,
          name: "my web api integration",
          host: "https://github.com/status",
          headers: [{ key: "Accept", value: "application/json" }],
        },
        {
          type: HealthTypes.Database,
          name: "my database",
          host: "localhost",
          dbPort: 5432,
          dbName: "postgres",
          dbUser: "postgres",
          dbPwd: "root",
          dbDialect: Dialects.postgres,
        },
        {
          type: HealthTypes.Custom,
          name: "my custom integration",
          host: "localhost",
          customCheckerFunction: () => {
            return { status: true, error: {} };
          },
        },
      ],
    })
  );
});

export default server;
```
