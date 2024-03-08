export const js_short = `import { Draft, Range } from "auteur";

const chart = new Draft();

let minVal = 9930;
let maxVal = 12000;
const newRange = new Range("value", [minVal, maxVal]);

chart.layer("#svg")
    .selection(leafRects)
    .exclude({"name":["fill"]})
    .augment(newRange.getAugs());
`