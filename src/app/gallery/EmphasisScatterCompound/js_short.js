export const js_short = `import { Draft, Emphasis } from "auteur";

let emphVal = 6;
let emphVar = "Sweetness";

let emphCatVal = "Other";
let emphCatVar = "Variety";

const draft = new Draft();
const newEmphasis = new Emphasis(emphVar, emphVal);
const newCatEmphasis = new Emphasis(emphCatVar, emphCatVal);

draft.layer("#svg")
    .selection(scatterpoints)
    .x("Aroma", xScale)
    .y("Flavor", yScale)
    .exclude({"name":["label", "regression"]})
    .augment(newEmphasis.intersect(newCatEmphasis));
`