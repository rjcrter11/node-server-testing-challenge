const Cats = require("./cats-model");

const db = require("../data/dbConfig");
const request = require("supertest");

const server = require("../api/server");

afterEach(async () => {
  await db("cats").truncate();
});
const url = "/api/cats";

describe("cats-router.js", () => {
  describe("getAll ", () => {
    it("should get a lists of cats", async () => {
      const cats = await db("cats");
      expect(cats).toHaveLength(0);
    });
    it("should run 200", async () => {
      await db("cats");
      expect(200);
    });
  });

  describe("Post /api/cats", () => {
    it("should add a cat to the database", () => {
      return request(server)
        .post(url)
        .send({
          name: "Stinky",
          breed: "trash cat"
        })
        .expect(201);
    });

    it("should add the correct cat to the database", () => {
      return request(server)
        .post(url)
        .send({
          name: "DingoCat",
          breed: "trash cat"
        })
        .expect(201)
        .then((res) => {
          expect(res.body.name).toBe("DingoCat");
          expect(res.body.breed).toBe("trash cat");
        });
    });
    it("should throw when lacking a name or breed", () => {
      return request(server)
        .post("/api/cats")
        .send({
          name: "Bobert"
        })
        .expect(500);
    });
    it("accepts a name and breed", () => {
      return request(server)
        .post("/api/cats")
        .send({
          name: "Spagets",
          breed: "trash cat"
        })
        .expect(201);
    });

    it("should return a name, breed and id", () => {
      return request(server)
        .post("/api/cats")
        .send({
          name: "pam",
          breed: "trash cat"
        })
        .expect(201)
        .then((res) => {
          expect(res.body.id).toBeTruthy();
          expect(res.body.name).toBe("pam");
          expect(res.body.breed).toBe("trash cat");
        });
    });
  });

  describe(".delete()", () => {
    it("should remove the cat from the database", async () => {
      await Cats.insert({ name: "Stinky", breed: "trash cat" });
      const newCat = await db("cats");
      expect(newCat).toHaveLength(1);
      expect(200);
      return request(server)
        .delete("/api/cats/1")
        .expect(200);
    });
    it("should return the message: heGone", async () => {
      await Cats.insert({ name: "Stinky", breed: "trash cat" });
      const newCat = await db("cats");
      expect(newCat).toHaveLength(1);
      expect(200);
      return request(server)
        .delete("/api/cats/1")
        .then((res) => {
          expect(res.body.heGone).toBeTruthy();
          expect(res.body.heGone).toMatch(/say bye/i);
        });
    });
  });
});
