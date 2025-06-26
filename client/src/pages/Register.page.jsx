// filepath: [Register.page.jsx](http://_vscodecontentref_/3)
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:3000/google-login/register", {
				email,
				password,
			});
			navigate("/login");
		} catch (err) {
			setError(
				err.response?.data?.error ||
					err.response?.data?.message ||
					"Register failed"
			);
		}
	};

	return (
		<div className="container mt-5">
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
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
					Register
				</button>
			</form>
		</div>
	);
}
