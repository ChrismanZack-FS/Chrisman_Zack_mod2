const Necrons = require("../models/Necrons");
const messages = require("../messages");

const getAllNecrons = async (req, res) => {
	try {
		const necrons = await Necrons.find({})
			.populate({
				path: "enemies.marineId",
				select: "name",
			})
			.select("-__v");

		res.status(200).json({
			data: necrons,
			success: true,
			message: `${messages.SUCCESS}: ${req.method} request made to Necrons`,
		});
	} catch (error) {
		handleError(error, res);
	}
};

const createNecron = async (req, res) => {
	const { necron } = req.body;
	try {
		const newNecron = await Necrons.create(necron);
		console.log(">>>", newNecron);
		res.status(201).json({
			data: newNecron,
			success: true,
			message: `${messages.SUCCESS}: ${req.method} request made to create Necron`,
		});
	} catch (error) {
		handleError(error, res);
	}
};

const getNecronById = async (req, res) => {
	const { id } = req.params;
	try {
		const necron = await Necrons.findById(id).populate({
			path: "enemies.marineId",
			select: "name",
		});

		if (!necron) {
			return res.status(404).json({
				success: false,
				message: messages.NOT_FOUND,
			});
		}

		res.status(200).json({
			data: necron,
			success: true,
			message: `${messages.SUCCESS}: ${req.method} request made to Necron`,
		});
	} catch (error) {
		handleError(error, res);
	}
};

const updateNecron = async (req, res) => {
	const { id } = req.params;
	try {
		const necron = await Necrons.findByIdAndUpdate(id, req.body, {
			new: true,
		}).populate({
			path: "enemies.marineId",
			select: "name",
		});

		if (!necron) {
			return res.status(404).json({
				success: false,
				message: messages.NOT_FOUND,
			});
		}

		res.status(200).json({
			data: necron,
			success: true,
			message: `${messages.SUCCESS}: ${req.method} request updated Necron`,
		});
	} catch (error) {
		handleError(error, res);
	}
};

const deleteNecron = async (req, res) => {
	const { id } = req.params;
	try {
		const necron = await Necrons.findById(id);
		if (!necron) {
			return res.status(404).json({
				success: false,
				message: messages.NOT_FOUND,
			});
		}

		await necron.deleteOne();
		res.status(200).json({
			data: necron,
			success: true,
			message: `${messages.SUCCESS}: ${req.method} killed a Necron`,
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
	createNecron,
	deleteNecron,
	updateNecron,
	getNecronById,
	getAllNecrons,
};
