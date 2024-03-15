export const js_short = `import { Draft, Threshold } from "auteur";

let barThreshold = 150;
let barOperation = "leq";

const draft = new Draft();
const newBarThreshold = new Threshold("count", barThreshold, barOperation);

newBarThreshold.selection(bars);

draft.layer("#svg")
	.x("Country", xScale)
	.y("count", yScale)
	.exclude({"name":["label", "regression", "fill", "stroke"]})
	.augment(newBarThreshold.getAugs());
`