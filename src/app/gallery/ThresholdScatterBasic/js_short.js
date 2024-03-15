export const js_short = `import { Draft, Threshold } from "auteur";

const yThreshold = new Threshold("Flavor", "median", "geq");
yThreshold.selection(scatterpoints);

const augmentations = yThreshold.getAugs();

const draft = new Draft();

draft.layer("#svg")
  .x("Aroma", xScale)
  .y("Flavor", yScale)
  .augment(augmentations);
`