const Necrons = require("../models/Necrons");

const getAllNecrons = async (req, res) => {
	try {
		const necrons = await Necrons.find({});
		res.status(200).json({
			data: necrons,
			success: true,
			message: `${req.method} Request made to Necrons`,
		});
	} catch (error) {
		if ((error.name = "ValidationError")) {
			console.error("Error Validating!", error);
			res.status(422).json(error);
		} else {
			console.error(error);
			res.status(500).json(error);
		}
	}
};

const createNecron = async (req, res) => {
	const { necron } = req.body;
	try {
		const newNecron = await Necrons.create(necron);
		console.log(">>>", newNecron);
		res.status(200).json({
			data: newNecron,
			success: true,
			message: `${req.method} Request made to Necron`,
		});
	} catch (error) {
		if ((error.name = "ValidationError")) {
			console.error("Error Validating!", error);
			res.status(422).json(error);
		} else {
			console.error(error);
			res.status(500).json(error);
		}
	}
};

const getNecronById = async (req, res) => {
	console.log("id >>>", req.params.id);
	const { id } = req.params;
	try {
		const necron = await Necrons.findById(id);

		res.status(200).json({
			data: necron,
			success: true,
			message: `${req.method} Request made to Necron`,
		});
	} catch (error) {
		if ((error.name = "ValidationError")) {
			console.error("Error Validating!", error);
			res.status(422).json(error);
		} else {
			console.error(error);
			res.status(500).json(error);
		}
	}
};

const updateNecron = async (req, res) => {
	const { id } = req.params;
	try {
		const necron = await Necrons.findByIdAndUpdate(id, req.body, { new: true });

		res.status(200).json({
			data: necron,
			success: true,
			message: `${req.method} Request updated Necrons`,
		});
	} catch (error) {
		if ((error.name = "ValidationError")) {
			console.error("Error Validating!", error);
			res.status(422).json(error);
		} else {
			console.error(error);
			res.status(500).json(error);
		}
	}
};

const deleteNecron = async (req, res) => {
	console.log("id >>>", req.params.id);
	const { id } = req.params;
	try {
		const necron = await Necrons.findById(id);
		await necron.deleteOne();

		res.status(200).json({
			data: necron,
			success: true,
			message: `${req.method} Killed a Necron`,
		});
	} catch (error) {
		if ((error.name = "ValidationError")) {
			console.error("Error Validating!", error);
			res.status(422).json(error);
		} else {
			console.error(error);
			res.status(500).json(error);
		}
	}
};

module.exports = {
	createNecron,
	deleteNecron,
	updateNecron,
	getNecronById,
	getAllNecrons,
};
