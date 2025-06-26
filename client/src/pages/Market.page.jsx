import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketDigimons } from "../store/marketSlice";
import { buyDigimon } from "../store/myDigimonSlice";

export default function MarketPage() {
	const dispatch = useDispatch();
	const { digimons, loading, error } = useSelector((state) => state.market);

	useEffect(() => {
		dispatch(fetchMarketDigimons());
	}, [dispatch]);

	const handleBuy = (digimon) => {
		dispatch(
			buyDigimon({
				digimonName: digimon.name,
				img: digimon.img,
				level: digimon.level,
			})
		);
	};

	const getRecommendation = async () => {
		const token = localStorage.getItem("access_token");
		const res = await fetch("http://localhost:3000/market/recommendation", {
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await res.json();
		alert(data.recommendation);
	};

	if (loading) return <p>Loading market...</p>;
	if (error) return <p>Error loading Digimon: {error}</p>;

	return (
		<div className="container mt-4">
			<h2>🛒 Digimon Market</h2>
			<button className="btn btn-primary btn-sm" onClick={getRecommendation}>
				Get Recommendation
			</button>
			<div className="row">
				{digimons.map((digimon, i) => (
					<div className="col-md-3" key={i}>
						<div className="card mb-3 shadow">
							<img
								src={digimon.img}
								alt={digimon.name}
								className="card-img-top"
							/>
							<div className="card-body">
								<h5>{digimon.name}</h5>
								<p>Level: {digimon.level}</p>
								<button
									className="btn btn-primary btn-sm"
									onClick={() => handleBuy(digimon)}
								>
									Buy
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
