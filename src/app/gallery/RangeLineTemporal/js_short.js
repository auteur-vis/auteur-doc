export const js_short = `import { Draft, Range } from "auteur";

let minThreshold = new Date(2006, 1, 1);
let maxThreshold = new Date(2011, 12, 31);

const newRange = new Range("date", [minThreshold, maxThreshold], "closed");

const draft = new Draft();

draft.layer("#svg")
    .selection(lines)
    .x("date", xScale)
    .y("AverageTemperature", yScale)
    .exclude({"name": ["text", "opacity"]})
    .augment(newRange.getAugs());
`