export const js_short = `import { Draft, Threshold } from "auteur";

const draft = new Draft();
const newThreshold = new Threshold("Flavor", 8, "leq", style);

let newAugs = newThreshold.getAugs();

draft.layer("#svg")
    .selection(bars)
    .x("FIELD1", xScale)
    .y("Flavor", yScale)
    .exclude({"name":["regression"]})
    .augment(newAugs);
`