export const js_short = `import { Draft, Range } from "auteur";

let maxThreshold = 8;
let minThreshold = 6.5;

const style = {"rect":{"fill":"#edcf7b", "opacity": 0.2}};

const draft = new Draft();
const newRange = new Range("Aroma", [minThreshold, maxThreshold], "open", style);

draft.chart("#svg")
    .layer("#augmentations")
    .selection(scatterpoints)
    .x("Aroma", xScale)
    .y("Flavor", yScale)
    .exclude({"name":["regression", "label", "text"]})
    .augment(newRange.getAugs());
`