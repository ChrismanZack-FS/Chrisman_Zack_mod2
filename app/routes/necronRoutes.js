const express = require("express");
const router = express.Router();
const {
	createNecron,
	deleteNecron,
	updateNecron,
	getNecronById,
	getAllNecrons,
} = require("../controller/necronController");

router.get("/", getAllNecrons);

router.post("/", createNecron);

router.get("/:id", getNecronById);

router.patch("/:id", updateNecron);

router.delete("/:id", deleteNecron);

module.exports = router;
