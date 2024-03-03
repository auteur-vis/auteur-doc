export const js_short = `import { Draft, Emphasis } from "auteur";

let emphVar = "Sweetness";
let emphVal = 8;

const draft = new Draft();
const newEmphasis = new Emphasis(emphVar, emphVal);

draft.chart("#svg")
	  .selection(scatterpoints)
	  .x("Aroma", xScale)
	  .y("Flavor", yScale)
	  .exclude({"name":["regression", "label"]})
	  .augment(newEmphasis.getAugs());
`