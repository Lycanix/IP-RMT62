import { Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/Login.page";
import HomePage from "./pages/Home.page";
import RegisterPage from "./pages/Register.page";

export default function App() {
	// const isAuthenticated = !!localStorage.getItem("access_token");

	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			{/* Halaman Home – hanya bisa diakses jika sudah login */}
			{/* <Route
				path="/"
				element={
					isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
				}
			/> */}

			{/* Halaman Login – kalau sudah login langsung ke Home */}
			{/* <Route
				path="/login"
				element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
			/> */}

			{/* Halaman Register (jika ada fitur ini) */}
			{/* <Route path="/register" element={<RegisterPage />} /> */}

			{/* Catch-all: arahkan ke root */}
			{/* <Route path="*" element={<Navigate to="/" replace />} /> */}
		</Routes>
	);
}
