const db = require("../data/dbConfig");

module.exports = {
  insert,
  remove,
  getAll,
  getById
};

function getAll() {
  return db("cats");
}

function getById(id) {
  return db("cats")
    .where({ id })
    .first();
}

function insert(catData) {
  return db("cats")
    .insert(catData, "id")
    .then(([id]) => {
      return getById(id);
    });
}

function remove(id) {
  return db("cats")
    .where({ id })
    .del();
}
