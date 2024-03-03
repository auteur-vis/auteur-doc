export const js_short = `import { Draft, Emphasis } from "auteur";

const draft = new Draft();
const newEmphasis = new Emphasis("Flavor", "min");

draft.chart("#svg")
      .selection(bars)
      .x("FIELD1", xScale)
      .y("Flavor", yScale)
      .exclude({"name":["regression", "label"]})
      .augment(newEmphasis.getAugs());
`