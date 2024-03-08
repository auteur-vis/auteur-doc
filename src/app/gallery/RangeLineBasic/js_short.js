export const js_short = `import { Draft, Range } from "auteur";

let maxThreshold = 26.5;
let minThreshold = -5;

const newRange = new Range("AverageTemperature", [minThreshold, maxThreshold], "closed");

const draft = new Draft();

draft.layer("#svg")
    .selection(lines)
    .x("date", xScale)
    .y("AverageTemperature", yScale)
    .exclude({"name": ["fill", "label"]})
    .augment(newRange.getAugs());
`
