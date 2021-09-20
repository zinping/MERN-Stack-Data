const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

// get all users details except password
module.exports.getAllUsers = async (req, res) => {
	const users = await UserModel.find().select("-password");
	res.status(200).json(users);
};

// check params id is valid then use id to find user info (minus password)
module.exports.userInfo = (req, res) => {
	if (!ObjectID.isValid(req.params.id))
		return res.status(400).send("ID unknown : " + req.params.id);

	UserModel.findById(req.params.id, (err, docs) => {
		if (!err) res.send(docs);
		else console.log("ID unknown : " + err);
	}).select("-password");
};

// check params id is valid then use id to find and update user info
module.exports.updateUser = async (req, res) => {
	if (!ObjectID.isValid(req.params.id))
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		await UserModel.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					bio: req.body.bio,
				},
			},
			{ new: true, upsert: true, setDefaultsOnInsert: true },
			(err, docs) => {
				if (!err) return res.send(docs);
				if (err) return res.status(500).send({ message: err });
			}
		);
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

// check params id is valid then use to remove user from DB
module.exports.deleteUser = async (req, res) => {
	if (!ObjectID.isValid(req.params.id))
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		await UserModel.remove({ _id: req.params.id }).exec();
		res.status(200).json({ message: "Successfully deleted. " });
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

// check params id & body id are valid then add id to follow to the 'following' list
module.exports.follow = async (req, res) => {
	if (
		!ObjectID.isValid(req.params.id) ||
		!ObjectID.isValid(req.body.idToFollow)
	)
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		await UserModel.findByIdAndUpdate(
			req.params.id,
			{ $addToSet: { following: req.body.idToFollow } },
			{ new: true, upsert: true },
			(err, docs) => {
				if (!err) res.status(201).json(docs);
				else return res.status(400).json(err);
			}
		);
		// add to 'following' list
		await UserModel.findByIdAndUpdate(
			req.body.idToFollow,
			{ $addToSet: { followers: req.params.id } },
			{ new: true, upsert: true },
			(err, docs) => {
				// if (!err) res.status(201).json(docs);
				if (err) return res.status(400).json(err);
			}
		);
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};

// check params id & body id are valid then remove (pull) id to unfollow
module.exports.unfollow = async (req, res) => {
	if (
		!ObjectID.isValid(req.params.id) ||
		!ObjectID.isValid(req.body.idToUnfollow)
	)
		return res.status(400).send("ID unknown : " + req.params.id);

	try {
		await UserModel.findByIdAndUpdate(
			req.params.id,
			{ $pull: { following: req.body.idToUnfollow } },
			{ new: true, upsert: true },
			(err, docs) => {
				if (!err) res.status(201).json(docs);
				else return res.status(400).jsos(err);
			}
		);

		await UserModel.findByIdAndUpdate(
			req.body.idToUnfollow,
			{ $pull: { followers: req.params.id } },
			{ new: true, upsert: true },
			(err, docs) => {
				// if (!err) res.status(201).json(docs);
				if (err) return res.status(400).jsos(err);
			}
		);
	} catch (err) {
		return res.status(500).json({ message: err });
	}
};
