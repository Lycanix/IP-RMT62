import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
	const navigate = useNavigate();
	const isAuthenticated = !!localStorage.getItem("access_token");

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
			<Link className="navbar-brand" to="/">
				DigiGrowth
			</Link>

			<div className="collapse navbar-collapse">
				<ul className="navbar-nav me-auto mb-2 mb-lg-0">
					{isAuthenticated && (
						<>
							<li className="nav-item">
								<Link className="nav-link" to="/">
									🏠 Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/my-digimons">
									🐉 My Digimon
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/profile">
									👤 User
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/market">
									🛒 Market
								</Link>
							</li>
						</>
					)}
				</ul>
				{isAuthenticated && (
					<button className="btn btn-outline-light" onClick={handleLogout}>
						Logout
					</button>
				)}
			</div>
		</nav>
	);
}
