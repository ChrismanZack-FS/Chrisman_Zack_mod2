const express = require("express");
const router = express.Router();
const {
	createMarine,
	deleteMarine,
	updateMarine,
	getMarineById,
	getAllMarines,
} = require("../controller/marineController");

router.get("/", getAllMarines);

router.post("/", createMarine);

router.get("/:id", getMarineById);

router.patch("/:id", updateMarine);

router.delete("/:id", deleteMarine);

module.exports = router;
