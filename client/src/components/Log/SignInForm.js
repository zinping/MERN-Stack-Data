import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
  //define constants
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

  // handle user input
	const handleLogin = (e) => {
		e.preventDefault();

    // define constants
		const emailError = document.querySelector('.email.error');
		const passwordError = document.querySelector('.password.error');

    // post login data array
    // if errors display them using innerHTML
    // if good navigate to home page
		axios({
			method: 'post',
			url: `${process.env.REACT_APP_API_URL}api/user/login`,
			withCredentials: true,
			data: {
				email,
				password,
			},
		})
			.then((res) => {
				console.log(res);
				if (res.data.errors) {
					emailError.innerHTML = res.data.errors.email;
					passwordError.innerHTML = res.data.errors.password;
				} else {
					window.location = '/';
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<form action="" onSubmit={handleLogin} id="sign-up-form">

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
			<input type="submit" value="Connect" />
		</form>
	);
};

export default SignInForm;
