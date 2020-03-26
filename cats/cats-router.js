const express = require("express");
const router = express.Router();

const Cats = require("./cats-model");

router.get("/", (req, res) => {
  Cats.getAll()
    .then((cats) => {
      res.status(200).json(cats);
    })
    .catch((err) => {
      res.status(500).json({ message: "Could not get cats to come. Typical" });
    });
});

router.get("/:id", (req, res) => {
  Cats.getById(req.params.id)
    .then((cat) => {
      if (cat) {
        res.status(200).json(cat);
      } else {
        res
          .status(404)
          .json({ message: "He's probably hiding behind the oven again" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Shake the food bag maybe?", err });
    });
});

router.post("/", (req, res) => {
  const newCat = req.body;
  Cats.insert(newCat)
    .then((newCat) => {
      if (!newCat.name || !newCat.breed) {
        res.status(400).json({ message: "You left out some cat info" });
      }
      res.status(201).json(newCat);
    })
    .catch((err) => {
      res.status(500).json({ message: "Don't bring that cat in", err });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Cats.remove(id)
    .then((left) => {
      if (left) {
        res.json({ heGone: "Say bye" });
      } else {
        res.status(404).json({ message: "Couldnt find him to get rid of him" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "He leaves when he wants, man" });
    });
});

module.exports = router;
