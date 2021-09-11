module.exports.signUpErrors = (err) => {
	let errors = { nickname: '', email: '', password: '' };

	if (err.message.includes('nickname'))
		errors.nickname = 'This nickname is already taken';

	if (err.message.includes('email')) errors.email = 'Email incorrect';

	if (err.message.includes('password'))
		errors.password = 'The password must be 6 characters or more';

	if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('nickname'))
		errors.nickname = 'This nickname is already taken';

	if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
		errors.email = 'This email is already registered';

	return errors;
};

module.exports.signInErrors = (err) => {
	let errors = { email: '', password: '' };

	if (err.message.includes('email')) errors.email = 'Email unknown';

	if (err.message.includes('password'))
		errors.password = 'The password entered is incorrect';

	return errors;
};

module.exports.uploadErrors = (err) => {
	let errors = { format: '', maxSize: '' };

	if (err.message.includes('invalid file'))
		errors.format = 'File format is incompatible';

	if (err.message.includes('max size'))
		errors.maxSize = 'The file is over 500kb';

	return errors;
};
