const { Poll } = require("../models");

const getPolls = async (req, res) => {
  const polls = await Poll.find({});
  res.json(polls || []);
};

const getUserPolls = async (req, res) => {
  const { userId } = req.query;
  const polls = await Poll.find({ created_by: userId });
  res.json(polls || []);
};

const createPoll = async (req, res) => {
  const { userId, question, options: optionString } = req.body;

  const options = optionString
    .split(",")
    .map((option) => ({ name: option, votes: [] }));

  const createdPoll = await Poll.create({
    created_by: userId,
    question,
    options,
  });

  res.json(createdPoll);
};

module.exports = { getPolls, getUserPolls, createPoll };
