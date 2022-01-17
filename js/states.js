/**
 *  Treehouse FSJS Techdegree:
 *  Project 5 - Public API Requests
 *  Student: Ryan Agatep
 *  states.js
 */

/**
 *  Copied from https://gist.github.com/calebgrove/c285a9510948b633aa47
 *  Takes in a state name and outputs its abbreviation.
 */
function stateNameToAbbreviation(name) {
	let states = {
		"arizona": "AZ",
		"alabama": "AL",
		"alaska": "AK",
		"arkansas": "AR",
		"california": "CA",
		"colorado": "CO",
		"connecticut": "CT",
		"district of columbia": "DC",
		"delaware": "DE",
		"florida": "FL",
		"georgia": "GA",
		"hawaii": "HI",
		"idaho": "ID",
		"illinois": "IL",
		"indiana": "IN",
		"iowa": "IA",
		"kansas": "KS",
		"kentucky": "KY",
		"louisiana": "LA",
		"maine": "ME",
		"maryland": "MD",
		"massachusetts": "MA",
		"michigan": "MI",
		"minnesota": "MN",
		"mississippi": "MS",
		"missouri": "MO",
		"montana": "MT",
		"nebraska": "NE",
		"nevada": "NV",
		"new hampshire": "NH",
		"new jersey": "NJ",
		"new mexico": "NM",
		"new york": "NY",
		"north carolina": "NC",
		"north dakota": "ND",
		"ohio": "OH",
		"oklahoma": "OK",
		"oregon": "OR",
		"pennsylvania": "PA",
		"rhode island": "RI",
		"south carolina": "SC",
		"south dakota": "SD",
		"tennessee": "TN",
		"texas": "TX",
		"utah": "UT",
		"vermont": "VT",
		"virginia": "VA",
		"washington": "WA",
		"west virginia": "WV",
		"wisconsin": "WI",
		"wyoming": "WY",
		"american samoa": "AS",
		"guam": "GU",
		"northern mariana islands": "MP",
		"puerto rico": "PR",
		"us virgin islands": "VI",
		"us minor outlying islands": "UM"
	}
	let a = name.trim().replace(/[^\w ]/g, "").toLowerCase(); //Trim, remove all non-word characters with the exception of spaces, and convert to lowercase
	if(states[a] !== null) {
		return states[a];
	}
	return null;
}