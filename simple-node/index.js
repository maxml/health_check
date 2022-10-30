const express = require("express");
const {
  HealthcheckerSimpleCheck,
  HealthcheckerDetailedCheck,
} = require("nodejs-health-checker/dist/healthchecker/healthchecker");
const { HealthTypes } = require("nodejs-health-checker/dist/interfaces/types");
const server = express();
server.get("/", (req, res) => {
  res.json({ status: "I'm alive!" });
});
server.get("/health-check/liveness", (req, res) => {
  res.json(HealthcheckerSimpleCheck());
});
server.get("/health-check/readiness", async (req, res) => {
  let result = await HealthcheckerDetailedCheck({
    name: "example",
    version: "v1.0.0",
    integrations: [
      {
        type: HealthTypes.Web,
        name: "A simple api integration check",
        host: "https://github.com/status",
      },
      {
        type: HealthTypes.Redis,
        name: "redis integration",
        host: "compute.amazonaws.com",
        port: 00000,
        auth: {
          password: "password",
        },
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
  });
  res.json(result);
});
server.listen(3000, () => {
  console.log("server started at port 3000");
});
