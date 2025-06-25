import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// === Login biasa (email + password) ===
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post("http://localhost:3000/login", {
				email,
				password,
			});
			localStorage.setItem("access_token", data.access_token);
			navigate("/");
		} catch (err) {
			console.error(err.response?.data || err.message);
		}
	};

	// === Login Google otomatis ===
	useEffect(() => {
		/* global google */
		window.handleCredentialResponse = async (response) => {
			try {
				const { data } = await axios.post(
					"http://localhost:3000/google-login",
					{
						idToken: response.credential,
					}
				);
				localStorage.setItem("access_token", data.access_token);
				navigate("/");
			} catch (err) {
				console.error(
					"Google Login Failed:",
					err.response?.data || err.message
				);
			}
		};

		const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
		if (window.google && clientId) {
			google.accounts.id.initialize({
				client_id: clientId,
				callback: handleCredentialResponse,
			});
			google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
				theme: "outline",
				size: "large",
			});
			google.accounts.id.prompt();
		}
	}, []);

	return (
		<div className="container mt-5">
			<h2>Login</h2>

			{/* Login Manual */}
			<form onSubmit={handleLogin}>
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

			{/* Google Login Button */}
			<div id="buttonDiv" className="my-3" />
		</div>
	);
}
