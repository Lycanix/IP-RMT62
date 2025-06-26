import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("access_token");
		if (!token) {
			navigate("/login");
			return;
		}

		const fetchProfile = async () => {
			try {
				const { data } = await axios.get(
					`${import.meta.env.VITE_API_BASE_URL}/google-login/profile`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setUser(data);
			} catch (err) {
				setError("Failed to fetch profile");
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, [navigate]);

	if (loading) return <p>Loading profile...</p>;
	if (error) return <p>{error}</p>;

	return (
		<>
			<div className="container mt-5">
				<h2>👤 User Profile</h2>
				<div className="card p-3 mt-3">
					<p>
						<strong>Name:</strong> {user?.name || "Unknown User"}
					</p>
					<p>
						<strong>Email:</strong> {user?.email || "unknown@email.com"}
					</p>
				</div>
			</div>
		</>
	);
}
