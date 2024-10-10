const Marines = require("../models/Spacemarines");
const messages = require("../messages");

const getAllMarines = async (req, res) => {
	try {
		const marines = await Marines.find({})
			.populate({
				path: "enemies.necronId",
				select: "name",
			})
			.select("-__v");

		res.status(200).json({
			data: marines,
			success: true,
			message: `${messages.SUCCESS}: ${req.method} request made to Marines`,
		});
	} catch (error) {
		handleError(error, res);
	}
};

const createMarine = async (req, res) => {
	const { marine } = req.body;
	try {
		const newMarine = await Marines.create(marine);
		console.log(">>>", newMarine);
		res.status(201).json({
			data: newMarine,
			success: true,
			message: `${messages.SUCCESS}: ${req.method} request made to Marines`,
		});
	} catch (error) {
		handleError(error, res);
	}
};

const getMarineById = async (req, res) => {
	const { id } = req.params;
	try {
		const marine = await Marines.findById(id).populate({
			path: "enemies.necronId",
			select: "name",
		});

		if (!marine) {
			return res.status(404).json({
				success: false,
				message: messages.NOT_FOUND,
			});
		}

		res.status(200).json({
			data: marine,
			success: true,
			message: `${messages.SUCCESS}: ${req.method} request made to Marines`,
		});
	} catch (error) {
		handleError(error, res);
	}
};

const updateMarine = async (req, res) => {
	const { id } = req.params;
	try {
		const marine = await Marines.findByIdAndUpdate(id, req.body, {
			new: true,
		}).populate({
			path: "enemies.necronId",
			select: "name",
		});

		if (!marine) {
			return res.status(404).json({
				success: false,
				message: messages.NOT_FOUND,
			});
		}

		res.status(200).json({
			data: marine,
			success: true,
			message: `${messages.SUCCESS}: ${req.method} request updated Marines`,
		});
	} catch (error) {
		handleError(error, res);
	}
};

const deleteMarine = async (req, res) => {
	const { id } = req.params;
	try {
		const marine = await Marines.findById(id);
		if (!marine) {
			return res.status(404).json({
				success: false,
				message: messages.NOT_FOUND,
			});
		}

		await marine.deleteOne();
		res.status(200).json({
			data: marine,
			success: true,
			message: `${messages.SUCCESS}: ${req.method} killed a Marine`,
		});
	} catch (error) {
		handleError(error, res);
	}
};

const handleError = (error, res) => {
	if (error.name === "ValidationError") {
		console.error("Validation Error:", error);
		res.status(422).json({
			success: false,
			message: messages.ERROR,
			error: error,
		});
	} else {
		console.error("Server Error:", error);
		res.status(500).json({
			success: false,
			message: messages.ERROR,
			error: error,
		});
	}
};

module.exports = {
	createMarine,
	deleteMarine,
	updateMarine,
	getMarineById,
	getAllMarines,
};
