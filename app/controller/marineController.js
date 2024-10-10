const Marines = require("../models/Spacemarines");

const getAllMarines = async (req, res) => {
	try {
		const marines = await Marines.find({});
		res.status(200).json({
			data: marines,
			success: true,
			message: `${req.method} Request made to Marines`,
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

const createMarine = async (req, res) => {
	const { marine } = req.body;
	try {
		const newMarine = await Marines.create(marine);
		console.log(">>>", newMarine);
		res.status(200).json({
			data: newMarine,
			success: true,
			message: `${req.method} Request made to Marines`,
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

const getMarineById = async (req, res) => {
	console.log("id >>>", req.params.id);
	const { id } = req.params;
	try {
		const marine = await Marines.findById(id);

		res.status(200).json({
			data: marine,
			success: true,
			message: `${req.method} Request made to Marines`,
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

const updateMarine = async (req, res) => {
	const { id } = req.params;
	try {
		const marine = await Marines.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		res.status(200).json({
			data: marine,
			success: true,
			message: `${req.method} Request updated Marines`,
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

const deleteMarine = async (req, res) => {
	console.log("id >>>", req.params.id);
	const { id } = req.params;
	try {
		const marine = await Marines.findById(id);
		await marine.deleteOne();

		res.status(200).json({
			data: marine,
			success: true,
			message: `${req.method} Killed a Marine`,
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
	createMarine,
	deleteMarine,
	updateMarine,
	getMarineById,
	getAllMarines,
};
