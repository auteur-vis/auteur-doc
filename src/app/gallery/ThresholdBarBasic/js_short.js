export const js_short = `import { Draft, Threshold } from "auteur";

const draft = new Draft();
const newThreshold = new Threshold("Flavor", 8, "leq", style);

newThreshold.selection(bars);

let newAugs = newThreshold.getAugs();

draft.layer("#svg")
    .x("FIELD1", xScale)
    .y("Flavor", yScale)
    .exclude({"name":["regression"]})
    .augment(newAugs);
`