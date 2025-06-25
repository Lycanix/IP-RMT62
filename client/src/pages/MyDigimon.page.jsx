import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import {
	fetchMyDigimons,
	feedDigimon,
	trainDigimon,
	playDigimon,
	deleteDigimon,
} from "../store/myDigimonSlice";
import { mapLevelToAttribute } from "../utils/mapLevelToAttribute";


export default function MyDigimonPage() {
	const dispatch = useDispatch();
	const { digimons, loading, error } = useSelector((state) => state.myDigimon);

	useEffect(() => {
		// dispatch(fetchMyDigimons()); ----> untuk ke server
	}, [dispatch]);

	if (loading) return <p>Loading digimons...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<>
			<Navbar />
			<div className="container mt-4">
				<h2>🧬 My Digimons</h2>
				<div className="row">
					{digimons.map((digimon) => (
						<div className="col-md-4" key={digimon.id}>
							<div className="card mb-3 shadow">
								<img
									src={digimon.image}
									className="card-img-top"
									alt={digimon.name}
								/>
								<div className="card-body">
									<h5 className="card-title">{digimon.name}</h5>
									<p className="card-text">
										Power: {digimon.power} <br />
										Hunger: {digimon.hunger} <br />
										Happiness: {digimon.happiness} <br />
										Attribute: {mapLevelToAttribute(digimon.level)}
									</p>
									<div className="d-flex flex-wrap gap-2">
										<button
											className="btn btn-success btn-sm"
											onClick={() => dispatch(feedDigimon(digimon.id))}
										>
											🍽 Feed
										</button>
										<button
											className="btn btn-warning btn-sm"
											onClick={() => dispatch(trainDigimon(digimon.id))}
										>
											🥊 Train
										</button>
										<button
											className="btn btn-info btn-sm"
											onClick={() => dispatch(playDigimon(digimon.id))}
										>
											🎮 Play
										</button>
										<button
											className="btn btn-danger btn-sm"
											onClick={() => dispatch(deleteDigimon(digimon.id))}
										>
											❌ Delete
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
					{digimons.length === 0 && (
						<p className="text-muted">No Digimons found.</p>
					)}
				</div>
			</div>
		</>
	);
}
