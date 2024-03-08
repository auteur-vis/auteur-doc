export const markdown_short = `import { Draft, Emphasis } from "auteur";

const draft = new Draft();
const newEmphasis = new Emphasis("Flavor", "min");

draft.layer(ref.current)
      .selection(bars)
      .x("FIELD1", xScale)
      .y("Flavor", yScale)
      .exclude({"name":["label"]})
      .augment(newEmphasis.getAugs());
`