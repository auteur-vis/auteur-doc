export const js_short = `import { Draft, DerivedValues } from "auteur";

const style = {"multiple":{"fill":"steelblue", "opacity":1}};

const draft = new Draft();
const newDerivedValues = new DerivedValues("Flavor", 0.1, "sub", undefined, style);

draft.chart("#svg")
    .selection(bars)
    .x("FIELD1", xScale)
    .y("Flavor", yScale)
    .exclude({"name":["line"]})
    .augment(newDerivedValues.getAugs());
`