function mapLevelToAttribute(level) {
	const vaccineLevels = ["Fresh", "In Training", "Rookie"];
	const dataLevels = ["Champion"];
	const virusLevels = ["Ultimate", "Mega"];

	if (vaccineLevels.includes(level)) return "Vaccine";
	if (dataLevels.includes(level)) return "Data";
	if (virusLevels.includes(level)) return "Virus";

	return "Unknown";
}

module.exports = {
	mapLevelToAttribute,
};
