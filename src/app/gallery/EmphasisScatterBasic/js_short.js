export const js_short = `import { Draft, Emphasis } from "auteur";

const draft = new Draft();
const newEmphasis = new Emphasis("Aroma", "median");

newEmphasis.selection(scatterpoints)
          .updateStyles(styles);

draft.layer("#svg")
      .x("Aroma", xScale)
      .y("Flavor", yScale)
      .exclude({"name":["label"]})
      .augment(newEmphasis.getAugs());
`