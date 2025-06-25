import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
	const navigate = useNavigate();
	const [user, setUser] = useState({});

	useEffect(() => {
		const token = localStorage.getItem("access_token");
		if (!token) {
			navigate("/login");
		}

		const storedName = localStorage.getItem("name");
		const storedEmail = localStorage.getItem("email");

		setUser({
			name: storedName || "Unknown User",
			email: storedEmail || "unknown@email.com",
		});
	}, []);

	return (
		<>
			<Navbar />
			<div className="container mt-5">
				<h2>👤 User Profile</h2>
				<div className="card p-3 mt-3">
					<p>
						<strong>Name:</strong> {user.name}
					</p>
					<p>
						<strong>Email:</strong> {user.email}
					</p>
				</div>
			</div>
		</>
	);
}
