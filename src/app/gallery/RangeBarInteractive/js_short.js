export const js_short = `import { Draft, Range } from "auteur";

const style = {"fill":{"fill":"steelblue"},
            "line":{"stroke-dasharray":"2px 5px 5px 5px"}};

let maxThreshold = 8.5;
let minThreshold = 8;
let newRange = new Range("Flavor", [minThreshold, maxThreshold], "closed", style);

let newAugs = newRange.getAugs();

const draft = new Draft();

draft.layer("#svg")
  .selection(bars)
  .x("FIELD1", xScale)
  .y("Flavor", yScale)
  .exclude({"name":["label", "regression", "text"]})
  .augment(newAugs);
`