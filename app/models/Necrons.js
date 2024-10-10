//model 1

const mongoose = require("mongoose");

const necronsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "You must enter a unit name."],
		unique: [true, "This unit is already in the database"],
		trim: true,
		maxlength: [50, "Unit name is too long"],
	},
	toughness: { type: Number, required: true },
	strength: { type: Number, required: true },
	keywords: {
		type: String,
		required: [true, "Must enter at least one keyword."],
		enum: [
			"Infantry",
			"Character",
			"Vehicle",
			"Monster",
			"Epic Hero",
			"Beast",
			"Battleline",
		],
	},
	enemies: [
		{
			_id: false,
			marineId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Space Marine",
			},
			name: {
				type: String,
			},
		},
	],
});
necronsSchema.pre("save", async function (next) {
	console.log("Pre-save middleware triggered for Necron");
	try {
		const spaceMarines = await mongoose.model("Space Marine").find();
		this.enemies = spaceMarines.map((marine) => ({
			marineId: marine._id,
			name: marine.name,
		}));
		console.log("Enemies populated:", this.enemies);
		next();
	} catch (error) {
		next(error);
	}
});

module.exports = mongoose.model("Necron", necronsSchema);
