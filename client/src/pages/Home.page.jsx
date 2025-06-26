import { useSelector } from "react-redux";

export default function HomePage() {
	const { lastInteracted, lastAction } = useSelector(
		(state) => state.myDigimon
	);

	const getNotif = () => {
		if (!lastAction) return null;
		if (lastAction === "feedDigimon") return "Hunger +1";
		if (lastAction === "trainDigimon") return "Power +1";
		if (lastAction === "playDigimon") return "Happiness +1";
		return null;
	};

	if (!lastInteracted) {
		return (
			<div className="container mt-4">
				<h1>Welcome to DigiGrowth!</h1>
				<p className="text-muted">
					Interact with your Digimon in My Digimon page.
				</p>
			</div>
		);
	}

	return (
		<div className="container mt-4">
			<h1>{lastInteracted.digimonName}</h1>
			<div className="card mb-3 mx-auto shadow" style={{ maxWidth: 400 }}>
				<img
					src={lastInteracted.img}
					className="card-img-top"
					alt={lastInteracted.digimonName}
				/>
				<div className="card-body">
					<h5 className="card-title">{lastInteracted.digimonName}</h5>
					<p className="card-text">
						Power: {lastInteracted.power}
						<br />
						Hunger: {lastInteracted.hunger}
						<br />
						Happiness: {lastInteracted.happiness}
						<br />
						Attribute: {lastInteracted.attribute}
					</p>
					{getNotif() && (
						<div className="alert alert-success">{getNotif()}</div>
					)}
				</div>
			</div>
		</div>
	);
}
