export const js_short = `import { Draft, Range } from "auteur";

const style = {"fill":{"fill":"steelblue"},
                   "line":{"stroke-dasharray":"2px 5px 5px 5px"}};

const draft = new Draft();
const newRange = new Range("Flavor", ["Q1", "Q3"], "closed", style);

draft.layer("#svg")
    .selection(scatterpoints)
    .x("Aroma", xScale)
    .y("Flavor", yScale)
    .exclude({"name":["opacity", "regression", "label"]})
    .augment(newRange.getAugs());
`