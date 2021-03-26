const Joi = require("@hapi/joi");

const getUserPolls = {
	params: Joi.object().keys({
		userId: Joi.string().required(),
	}),
};

const createPoll = {
	body: Joi.object().keys({
		question: Joi.string().required(),
		options: Joi.string().required(),
		userId: Joi.string().required(),
	}),
};

module.exports = {
	getUserPolls,
	createPoll,
};
