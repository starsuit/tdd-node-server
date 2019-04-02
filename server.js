const http = require("http");
const hostname = process.env.hostname || "localhost";
const port = process.env.port || 4000;
const router = require("./router");

http.createServer().listen(port, hostname, () => {
  console.log(`Server running at port http://${hostname}:${port}`);
});
