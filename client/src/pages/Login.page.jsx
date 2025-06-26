import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage({ onLogin }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				"http://localhost:3000/google-login/login",
				{
					email,
					password,
				}
			);
			localStorage.setItem("access_token", data.token);
			if (onLogin) onLogin();
			navigate("/");
		} catch (err) {
			setError(
				err.response?.data?.error ||
					err.response?.data?.message ||
					"Login failed"
			);
		}
	};

	useEffect(() => {
		window.handleCredentialResponse = async (response) => {
			try {
				const { data } = await axios.post(
					"http://localhost:3000/google-login/google",
					{
						idToken: response.credential,
					}
				);
				localStorage.setItem("access_token", data.token);
				if (onLogin) onLogin();
				navigate("/");
			} catch (err) {
				setError(
					"Google Login Failed: " + (err.response?.data?.error || err.message)
				);
			}
		};

		const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
		if (window.google && clientId) {
			window.google.accounts.id.initialize({
				client_id: clientId,
				callback: window.handleCredentialResponse,
			});
			window.google.accounts.id.renderButton(
				document.getElementById("buttonDiv"),
				{
					theme: "outline",
					size: "large",
				}
			);
			window.google.accounts.id.prompt();
			window._gsiInitialized = true;
		}
	}, [navigate, onLogin]);

	return (
		<div className="container mt-5">
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				{error && <div className="alert alert-danger">{error}</div>}
				<div className="mb-3">
					<label className="form-label">Email</label>
					<input
						type="email"
						className="form-control"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Password</label>
					<input
						type="password"
						className="form-control"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</form>
			<hr />
			<div id="buttonDiv" className="my-3" />
		</div>
	);
}
