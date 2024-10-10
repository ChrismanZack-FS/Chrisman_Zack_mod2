const http = require("http");
require("dotenv").config();
const app = require("./app/app");
const connectDB = require("./app/db/config");

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Service is up on ${PORT}`);
});
