export const markdown_short = `import { Draft, Emphasis } from "auteur";

const draft = new Draft();
const newEmphasis = new Emphasis("Aroma", "median");

newEmphasis.selection(scatterpoints)
          .updateStyles(styles);

draft.layer(ref.current)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["label"]})
            .augment(newEmphasis.getAugs());`