import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { buyDigimon } from "../store/myDigimonSlice";
import Navbar from "../components/Navbar";

export default function MarketPage() {
	const [digimons, setDigimons] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchMarket = async () => {
			try {
				const { data } = await axios.get("http://localhost:3000/market");
				setDigimons(data);
			} catch (err) {
				setError("Failed to fetch market data");
			} finally {
				setLoading(false);
			}
		};
		fetchMarket();
	}, []);

	const handleBuy = (digimon) => {
		dispatch(buyDigimon(digimon));
		alert(`${digimon.name} has been bought!`);
	};

	if (loading) return <p>Loading Market...</p>;
	if (error) return <p>{error}</p>;

	return (
		<>
			<Navbar />
			<div className="container mt-4">
				<h2>🛒 Digimon Market</h2>
				<div className="row">
					{digimons.map((digimon, index) => (
						<div className="col-md-4" key={index}>
							<div className="card mb-3 shadow">
								<img
									src={digimon.image}
									className="card-img-top"
									alt={digimon.name}
								/>
								<div className="card-body">
									<h5 className="card-title">{digimon.name}</h5>
									<p className="card-text">
										Level: {digimon.level} <br />
										Attribute: {digimon.attribute}
									</p>
									<button
										className="btn btn-primary"
										onClick={() => handleBuy(digimon)}
									>
										Buy 🛒
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
