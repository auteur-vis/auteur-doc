export const js_short = `import { Draft, Threshold } from "auteur";

const yThreshold = new Threshold("Flavor", "median", "geq");
const augmentations = yThreshold.getAugs();

const draft = new Draft();

draft.layer("#svg")
  .selection(scatterpoints)
  .x("Aroma", xScale)
  .y("Flavor", yScale)
  .augment(augmentations);
`