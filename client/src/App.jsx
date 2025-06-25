// src/App.jsx
import { Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/Login.page";
import HomePage from "./pages/Home.page";
import RegisterPage from "./pages/Register.page";

export default function App() {
	const isAuthenticated = !!localStorage.getItem("access_token");

	return (
		<Routes>
			{/* Halaman Home */}
			<Route
				path="/"
				element={
					isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
				}
			/>

			{/* Login Page */}
			<Route
				path="/login"
				element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
			/>

			{/* Register Page */}
			<Route
				path="/register"
				element={
					isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
				}
			/>

			{/* Catch all */}
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
