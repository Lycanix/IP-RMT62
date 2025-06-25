import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [idToken, setIdToken] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const { data } = await axios.post("http://localhost:3000/google-login", {
				idToken,
			});

			localStorage.setItem("access_token", data.access_token);
			navigate("/");
		} catch (err) {
			console.error("Login failed:", err.response?.data || err.message);
		}
	};

	return (
		<div className="container mt-5">
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div className="mb-3">
					<label className="form-label">Email (dummy)</label>
					<input
						type="email"
						className="form-control"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Google ID Token</label>
					<input
						type="text"
						className="form-control"
						value={idToken}
						onChange={(e) => setIdToken(e.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Login with Google
				</button>
			</form>
		</div>
	);
}
