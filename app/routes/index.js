const express = require("express");
const router = express.Router();

const necronRoutes = require("./necronRoutes");
const marineRoutes = require("./marineRoutes");

router.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		message: `${req.method} - Request made`,
		metadata: {
			hostname: req.hostname,
			method: req.method,
		},
	});
});

router.post("/", (req, res) => {
	console.log("Request body >>>", req.body);
	const { data } = req.body;
	res.status(200).json({
		message: `${req.method} - Request made`,
		data: data,
		metadata: { hostname: req.hostname, method: req.method },
	});
});

router.use("/necrons", necronRoutes);
router.use("/marines", marineRoutes);
module.exports = router;
