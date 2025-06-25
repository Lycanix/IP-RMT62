export function mapLevelToAttribute(level) {
	switch (level) {
		case "Fresh":
			return "Vaccine";
		case "In Training":
			return "Virus";
		case "Training":
			return "Data";
		case "Rookie":
			return "Vaccine";
		case "Champion":
			return "Data";
		case "Ultimate":
			return "Vaccine";
		case "Mega":
			return "Virus";
		default:
			return "Data";
	}
}
