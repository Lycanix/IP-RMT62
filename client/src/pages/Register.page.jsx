export default function RegisterPage() {
	return (
		<form className="w-50 mt-5 p-5 mx-auto border border-3 rounded-4">
            <h1>Register</h1>
			<div className="mb-3">
				<label htmlFor="exampleInputEmail1" className="form-label">
					Email address
				</label>
				<input
					type="email"
					className="form-control"
					id="exampleInputEmail1"
					aria-describedby="emailHelp"
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
				/>
			</div>

			<button type="submit" className="btn btn-primary">
				Register
			</button>
		</form>
	);
}
