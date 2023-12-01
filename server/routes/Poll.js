// polls.js
const express = require("express");
const Poll = require("../models/Poll");

const router = express.Router();

router.get("/", async (req, res) => {
  const polls = await Poll.find();
  res.json(polls);
});

router.post("/", async (req, res) => {
  const poll = new Poll({
    question: req.body.question,
    options: req.body.options,
    creator: req.body.creator
  });

  await poll.save();

  res.json(poll);
});

module.exports = router;
