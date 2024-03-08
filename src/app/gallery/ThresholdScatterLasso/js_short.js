export const js_short = `import { Draft, Threshold } from "auteur";

let yThreshold = 7.25;
const draft = new Draft();
const newYThreshold = new Threshold("Flavor", yThreshold, "geq");

let colorScale = d3.scaleSequential(d3.interpolateMagma)
                  .domain(d3.extent(data, d => d["Aroma"]));

const styles = {"fill": {"fill": (d, i) => colorScale(d.Aroma)}};

newYThreshold.updateStyles(styles);

draft.layer("#svg")
  .selection(scatterpoints)
  .x("Aroma", xScale)
  .y("Flavor", yScale)
  .exclude({"name":["regression", "label"]})
  .augment(newYThreshold.getAugs());
`