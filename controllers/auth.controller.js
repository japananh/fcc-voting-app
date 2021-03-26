const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { encryptData, decryptData } = require("../utils/auth");

const login = catchAsync(async (req, res) => {
	const { username, password } = req.body;

	const user = (await User.findOne({ username })).toJSON();
	if (!user || !user.password)
		throw new ApiError(404, { error: "User not found" });

	const match = decryptData(password, user.password);
	if (!match) throw new ApiError(404, { error: "Password did not match" });

	delete user.password;
	res.json(user);
});

const signup = catchAsync(async (req, res) => {
	const { username, password } = req.body;

	const hashPassword = await encryptData(password);

	if (!hashPassword) throw new ApiError(500, { error: "Server error" });

	const user = await User.create({ username, password: hashPassword });
	if (!user) throw new ApiError(500, { error: "Server error" });

	delete user.password;
	res.json(user);
});

module.exports = { login, signup };
