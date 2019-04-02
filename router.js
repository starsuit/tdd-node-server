const querystring = require("querystring");

const router = (req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("Hello");
  } else if (req.url == "/elephants") {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("unknown url");
  } else if (req.url == "/blog") {
    if (req.method === "GET") {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(JSON.stringify(["one", "two", "three"]));
    } else if (req.method === "POST") {
      if (req.headers.password === "potato") {
        let allTheData = "";
        req.on("data", chunkOfData => {
          allTheData += chunkOfData;
        });
        req.on("end", () => {
          if (allTheData === "") {
            res.writeHead(302, { Location: "/blog" });
            res.end();
          } else {
            res.writeHead(200, { "content-type": "text/html" });
            res.end(allTheData);
          }
        });
      } else {
        res.writeHead(403, { "content-type": "text/html" });
        res.end("Forbidden");
      }
    }
  }
};

module.exports = router;
