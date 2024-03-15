export const markdown_short = `import { Draft, Threshold } from "auteur";

const yThreshold = new Threshold("Flavor", "median", "geq");
yThreshold.selection(scatterpoints);

const augmentations = yThreshold.getAugs();

const draft = new Draft();

draft.layer(ref.current)
  .x("Aroma", xScale)
  .y("Flavor", yScale)
  .augment(augmentations);
`