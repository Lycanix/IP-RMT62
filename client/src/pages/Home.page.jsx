import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
	fetchMyDigimons,
	feedDigimon,
	trainDigimon,
	playDigimon,
	deleteDigimon,
} from "../store/myDigimonSlice";

export default function HomePage() {
	const dispatch = useDispatch();
	const { digimons, loading, error } = useSelector((state) => state.myDigimon);

	useEffect(() => {
		dispatch(fetchMyDigimons());
	}, [dispatch]);

	if (loading) return <p>Loading digimons...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<>
			<div className="container mt-4">
				<h1>My Digimons</h1>
				<div className="row">
					{digimons.map((digimon) => (
						<div className="col-md-4" key={digimon.id}>
							<div className="card mb-3">
								<img
									src={digimon.img}
									className="card-img-top"
									alt={digimon.digimonName}
								/>
								<div className="card-body">
									<h5 className="card-title">{digimon.digimonName}</h5>
									<p className="card-text">
										Power: {digimon.power}
										<br />
										Hunger: {digimon.hunger}
										<br />
										Happiness: {digimon.happiness}
										<br />
										Attribute: {digimon.attribute}
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
