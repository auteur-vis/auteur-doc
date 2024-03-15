export const js_short = `import { Draft, Threshold } from "auteur";

let yThreshold = "mean";

const draft = new Draft();
const newYThreshold = new Threshold("Flavor", yThreshold, "leq");

newYThreshold.selection(scatterpoints);

draft.layer("#svg")
    .x("Aroma", xScale)
    .y("Flavor", yScale)
    .exclude({"name":["regression", "label"]})
    .augment(newYThreshold.getAugs());
`