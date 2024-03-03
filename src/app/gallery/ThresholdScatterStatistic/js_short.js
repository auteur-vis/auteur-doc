export const js_short = `import { Draft, Threshold } from "auteur";

let yThreshold = "mean";

const draft = new Draft();
const newYThreshold = new Threshold("Flavor", yThreshold, "leq");

draft.chart("#svg")
    .selection(scatterpoints)
    .x("Aroma", xScale)
    .y("Flavor", yScale)
    .exclude({"name":["regression", "label"]})
    .augment(newYThreshold.getAugs());
`