import { useEffect, useState } from "react";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const handleCredentialResponse = (response) => {
			console.log("Encoded JWT ID token: " + response.credential);
		};

		// Fungsi untuk inisialisasi Google Sign-In setelah script siap
		const initializeGoogleSignIn = () => {
			if (
				window.google &&
				window.google.accounts &&
				window.google.accounts.id
			) {
				window.google.accounts.id.initialize({
					client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
					callback: handleCredentialResponse,
				});

				window.google.accounts.id.renderButton(
					document.getElementById("buttonDiv"),
					{ theme: "outline", size: "large" }
				);

				// Optional: tampilkan One Tap dialog
				// window.google.accounts.id.prompt();
			} else {
				// Tunggu sampai script selesai dimuat
				setTimeout(initializeGoogleSignIn, 100);
			}
		};

		initializeGoogleSignIn();
	}, []);

	return (
		<section>
			<form className="w-50 mt-5 p-5 mx-auto border border-3 rounded-4">
				<h1>Login</h1>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Email address
					</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="exampleInputPassword1"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</form>

			<div id="buttonDiv"></div>
		</section>
	);
}
