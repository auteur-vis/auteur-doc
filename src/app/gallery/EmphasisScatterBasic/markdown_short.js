export const markdown_short = `import { Draft, Emphasis } from "auteur";

const draft = new Draft();
const newEmphasis = new Emphasis(emphVar, emphVal);

draft.chart(ref.current)
            .selection(scatterpoints)
            .x("Aroma", xScale)
            .y("Flavor", yScale)
            .exclude({"name":["label"]})
            .augment(newEmphasis.getAugs());`