const mongoose = require('mongoose');
const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kaj5u.azure.mongodb.net/mern-project?retryWrites=true&w=majority`;
mongoose.connect(dbUrl, async (err) => {
	if (err) throw err;
	console.log('connected to MongoDB');
});
