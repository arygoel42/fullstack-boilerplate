const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const resource = req.body.resource;

  if (resource) {
    res.status(200).send(resource);
  } else if (!resource) {
    res.status(400).send("bad request");
  }
});

module.exports = router;
