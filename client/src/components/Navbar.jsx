import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ onLogout }) {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		if (onLogout) onLogout();
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
			<Link className="navbar-brand" to="/">
				DigiGrowth
			</Link>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav me-auto mb-2 mb-lg-0">
					<li className="nav-item">
						<Link className="nav-link" to="/mydigimons">
							My Digimon
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/market">
							Market
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/profile">
							Profile
						</Link>
					</li>
				</ul>
				<button className="btn btn-outline-light" onClick={handleLogout}>
					Logout
				</button>
			</div>
		</nav>
	);
}
