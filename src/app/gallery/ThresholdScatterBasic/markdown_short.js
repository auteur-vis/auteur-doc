export const markdown_short = `const yThreshold = new Threshold("Flavor", "median", "geq");
const augmentations = yThreshold.getAugs();

const draft = new Draft();

draft.chart("#svg")
  .selection(scatterpoints)
  .x("Aroma", xScale)
  .y("Flavor", yScale)
  .augment(augmentations);
`