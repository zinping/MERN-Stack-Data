import axios from "axios";

// define constants
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

// GET user data from backend using Axios - user id required
export const getUser = (uid) => {
	return (dispatch) => {
		return axios
			.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
			.then((res) => {
				dispatch({ type: GET_USER, payload: res.data });
			})
			.catch((err) => console.log(err));
	};
};

// POST user image to backend then get image data if successful
export const uploadPicture = (data, id) => {
	return (dispatch) => {
		return axios
			.post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
			.then((res) => {
				if (res.data.errors) {
					dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
				} else {
					dispatch({ type: GET_USER_ERRORS, payload: "" });
					return axios
						.get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
						.then((res) => {
							dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
						});
				}
			})
			.catch((err) => console.log(err));
	};
};

// PUT updated user data to backend
export const updateBio = (userId, bio) => {
	return (dispatch) => {
		return axios({
			method: "put",
			url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
			data: { bio },
		})
			.then((res) => {
				dispatch({ type: UPDATE_BIO, payload: bio });
			})
			.catch((err) => console.log(err));
	};
};

// PATCH user following list by adding follower id then dispatch
export const followUser = (followerId, idToFollow) => {
	return (dispatch) => {
		return axios({
			method: "patch",
			url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
			data: { idToFollow },
		})
			.then((res) => {
				dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
			})
			.catch((err) => console.log(err));
	};
};

export const unfollowUser = (followerId, idToUnfollow) => {
	return (dispatch) => {
		return axios({
			method: "patch",
			url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
			data: { idToUnfollow },
		})
			.then((res) => {
				dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } });
			})
			.catch((err) => console.log(err));
	};
};
