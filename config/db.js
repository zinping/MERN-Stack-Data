const mongoose = require("mongoose");
const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_ADDRESS}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbUrl, async (err) => {
	if (err) throw err;
	console.log("connected to MongoDB");
});
