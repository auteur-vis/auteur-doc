export const js_short = `import { Draft, Emphasis } from "auteur";

let emphVal = "Other";
let emphVar = "Variety";

const draft = new Draft();
const newEmphasis = new Emphasis(emphVar, emphVal);

newEmphasis.selection(scatterpoints);

draft.layer("#svg")
    .x("Aroma", xScale)
    .y("Flavor", yScale)
    .exclude({"name":["label", "regression"]})
    .augment(newEmphasis.getAugs());
`