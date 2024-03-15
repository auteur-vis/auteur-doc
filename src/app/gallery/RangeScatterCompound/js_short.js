export const js_short = `import { Draft, Range } from "auteur";

let minXThreshold = 7.5;
let maxXThreshold = 8;

let minYThreshold = 6.5;
let maxYThreshold = 7.5;

const draft = new Draft();
const newXRange = new Range("Aroma", [minXThreshold, maxXThreshold], "open");
const newYRange = new Range("Flavor", [minYThreshold, maxYThreshold], "closed");

newXRange.selection(scatterpoints);
newYRange.selection(scatterpoints);

draft.layer("#svg")
  .x("Aroma", xScale)
  .y("Flavor", yScale)
  .exclude({"name":["regression", "label", "text"]})
  .augment(newXRange.union(newYRange));
`