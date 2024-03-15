export const js_short = `import { Draft, Emphasis } from "auteur";

const draft = new Draft();
const newEmphasis = new Emphasis("Flavor", "min");

newEmphasis.selection(bars);

draft.layer("#svg")
      .x("FIELD1", xScale)
      .y("Flavor", yScale)
      .exclude({"name":["label"]})
      .augment(newEmphasis.getAugs());
`