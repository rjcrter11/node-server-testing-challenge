const request = require("supertest");
const server = require("./server");

describe("server.js", () => {
  describe("Get /", () => {
    it("should return 200", () => {
      return request(server)
        .get("/")
        .expect(200);
    });

    it("should return json", () => {
      return request(server)
        .get("/")
        .then((res) => {
          expect(res.body.api).toBe("up ");
        });
    });
  });
});
