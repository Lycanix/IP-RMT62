import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/Home.page";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import MyDigimonPage from "./pages/MyDigimon.page";
import MarketPage from "./pages/Market.page";
import ProfilePage from "./pages/Profile.page";
import Navbar from "./components/Navbar";

export default function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem("access_token")
	);

	useEffect(() => {
		const handleStorage = () =>
			setIsAuthenticated(!!localStorage.getItem("access_token"));
		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);

	const handleLogout = () => setIsAuthenticated(false);

	return (
		<>
			{isAuthenticated && <Navbar onLogout={handleLogout} />}
			<Routes>
				<Route
					path="/"
					element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/market"
					element={isAuthenticated ? <MarketPage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/mydigimons"
					element={
						isAuthenticated ? <MyDigimonPage /> : <Navigate to="/login" />
					}
				/>
				<Route
					path="/profile"
					element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/login"
					element={
						isAuthenticated ? (
							<Navigate to="/" />
						) : (
							<LoginPage onLogin={() => setIsAuthenticated(true)} />
						)
					}
				/>
				<Route
					path="/register"
					element={
						isAuthenticated ? <Navigate to="/mydigimons" /> : <RegisterPage />
					}
				/>
				<Route
					path="*"
					element={<Navigate to={isAuthenticated ? "/mydigimons" : "/login"} />}
				/>
			</Routes>
		</>
	);
}
