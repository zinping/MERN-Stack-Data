import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';

const SignUpForm = () => {
	// define constants
	const [formSubmit, setFormSubmit] = useState(false);
	const [nickname, setNickname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [controlPassword, setControlPassword] = useState('');

	// handle user inputs
	const handleRegister = async (e) => {
		e.preventDefault();

		// define constants
		const terms = document.getElementById('terms');
		const nicknameError = document.querySelector('.nickname.error');
		const emailError = document.querySelector('.email.error');
		const passwordError = document.querySelector('.password.error');
		const passwordConfirmError = document.querySelector(
			'.password-confirm.error'
		);
		const termsError = document.querySelector('.terms.error');

		//define error text
		passwordConfirmError.innerHTML = '';
		termsError.innerHTML = '';

		// logic to check password correct & terms box checked
		// if good post user data to backend using Axios
		// any errors are shown using innerHTML
		if (password !== controlPassword || !terms.checked) {
			if (password !== controlPassword)
				passwordConfirmError.innerHTML = 'The password is not correct';

			if (!terms.checked)
				termsError.innerHTML = 'Please accept the terms & conditions';
		} else {
			await axios({
				method: 'post',
				url: `${process.env.REACT_APP_API_URL}api/user/register`,
				data: {
					nickname,
					email,
					password,
				},
			})
				.then((res) => {
					console.log(res);
					if (res.data.errors) {
						nicknameError.innerHTML = res.data.errors.nickname;
						emailError.innerHTML = res.data.errors.email;
						passwordError.innerHTML = res.data.errors.password;
					} else {
						setFormSubmit(true);
					}
				})
				.catch((err) => console.log(err));
		}
	};

	// Once formSubmit is true Render sign-in form
	// Otherwise show sign-up form
	return (
		<>
			{formSubmit ? (
				<>
					<SignInForm />
					<span></span>
					<h4 className="success">
						Sign-up successful, do you want to connect?
					</h4>
				</>
			) : (
				<form action="" onSubmit={handleRegister} id="sign-up-form">
					{/* user input nickname */}
					<label htmlFor="nickname">Nickname</label>
					<br />
					<input
						type="text"
						name="nickname"
						id="nickname"
						onChange={(e) => setNickname(e.target.value)}
						value={nickname}
					/>
					<div className="nickname error"></div>
					<br />

					{/* user input email */}
					<label htmlFor="email">Email</label>
					<br />
					<input
						type="text"
						name="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<div className="email error"></div>
					<br />

					{/* user input password */}
					<label htmlFor="password">Password</label>
					<br />
					<input
						type="password"
						name="password"
						id="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					<div className="password error"></div>
					<br />

					{/* user input confirm password */}
					<label htmlFor="password-conf">Confirm password</label>
					<br />
					<input
						type="password"
						name="password"
						id="password-conf"
						onChange={(e) => setControlPassword(e.target.value)}
						value={controlPassword}
					/>
					<div className="password-confirm error"></div>
					<br />

					{/* user input accept terms */}
					<input type="checkbox" id="terms" />
					<label htmlFor="terms">
						I accept the{' '}
						<a href="/" target="_blank" rel="noopener noreferrer">
							Terms and Conditions
						</a>
					</label>
					<div className="terms error"></div>
					<br />
					<input type="submit" value="Validate signup" />
				</form>
			)}
		</>
	);
};

export default SignUpForm;
