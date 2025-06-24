import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
