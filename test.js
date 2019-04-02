const test = require("tape");
const supertest = require("supertest");
const router = require("./router");

test("Initialise", t => {
  let num = 2;
  t.equal(num, 2, "Should return 2");
  t.end();
});

test("Home route returns a status code of 200", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
    });
});

test("Home route", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.text, "Hello", "response should contain 'Hello'");
      t.end();
    });
});

test("/elephants returns 404 status code", t => {
  supertest(router)
    .get("/elephants")
    .expect(404)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 404, "should return status code 404");
      t.equal(res.text, "unknown url", "response should return 'unknown url'");
      t.end();
    });
});

test("/blog returns appropriate content", t => {
  supertest(router)
    .get("/blog")
    .expect(200)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "should return status code of 200");
      t.deepEqual(
        JSON.parse(res.text),
        ["one", "two", "three"],
        'response should contain \'["one", "two", "three"]\' '
      );
      t.end();
    });
});

test("/blog returns appropriate response on POST", t => {
  supertest(router)
    .post("/blog")
    .set("password", "potato")
    .send('["a", "b"]')
    .expect(200)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "should return status code 200");

      t.deepEqual(
        JSON.parse(res.text),
        ["a", "b"],
        'response should contain \'["a", "b"]\' '
      );
      t.end();
    });
});

test("/blog POST should return 403 when no header & body specified", t => {
  supertest(router)
    .post("/blog")
    .expect(403)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 403, "should return status code 403");
      t.equal(res.text, "Forbidden", "response should contain 'Forbidden'");
      t.end();
    });
});

test("/blog POST with password but no body should return content", t => {
  supertest(router)
    .post("/blog")
    .set("password", "potato")
    .expect(302)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 302, "should return status code 302");
      t.equal(
        res.header.location,
        "/blog",
        "should redirect page to location /blog"
      );
      t.end();
    });
});
