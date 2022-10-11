const http = require("http");
const { createTerminus } = require("./terminus");

const express = require("express");
const app = express();

app.get("/", (_req: any, res: any) => {
  res.send("ok");
});

const server = http.createServer(app);

const options = {
  // opts
};

createTerminus(server, options);

// server.listen(3000);

export default server;
