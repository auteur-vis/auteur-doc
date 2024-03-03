export const js_short = `import { Draft, Threshold } from "auteur";

let xThreshold = 8.3;
let yThreshold = 8.55;
let mergeBy = "symmdiff";

const draft = new Draft();
const newXThreshold = new Threshold("Aroma", xThreshold, "leq");
const newYThreshold = new Threshold("Flavor", yThreshold, "leq");

draft.chart("#svg")
    .selection(scatterpoints)
    .x("Aroma", xScale)
    .y("Flavor", yScale)
    .augment(merge(newXThreshold, newYThreshold, mergeBy));
`