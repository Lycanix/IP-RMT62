const levelToAttribute = {
	Fresh: "Baby",
	"In Training": "Data",
	Rookie: "Vaccine",
	Champion: "Data",
	Ultimate: "Virus",
	Mega: "Free",

};

function mapLevelToAttribute(level) {
	return levelToAttribute[level] || "Armor";
}

module.exports = { mapLevelToAttribute };
