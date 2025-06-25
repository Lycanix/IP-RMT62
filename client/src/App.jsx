import { Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/Login.page";
import HomePage from "./pages/Home.page";
import RegisterPage from "./pages/Register.page";
import ProfilePage from "./pages/Profile.page";
import MyDigimonPage from "./pages/MyDigimon.page";
import MarketPage from "./pages/Market.page";

export default function App() {
	const isAuthenticated = !!localStorage.getItem("access_token");

	return (
		<Routes>
			<Route
				path="/"
				element={
					isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
				}
			/>
			<Route
				path="/login"
				element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
			/>
			<Route path="/register" element={<RegisterPage />} />
			<Route
				path="/profile"
				element={
					isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />
				}
			/>
			<Route
				path="/my-digimons"
				element={
					isAuthenticated ? <MyDigimonPage /> : <Navigate to="/login" replace />
				}
			/>
			<Route
				path="/market"
				element={
					isAuthenticated ? <MarketPage /> : <Navigate to="/login" replace />
				}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
