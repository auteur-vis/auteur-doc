export const js_short = `import { Draft, Threshold } from "auteur";

let yThreshold = 8;

const draft = new Draft();
const newYThreshold = new Threshold("Aroma", yThreshold, "geq");

let colorScale = d3.scaleSequential(d3.interpolateViridis)
                  .domain(d3.extent(data, d => d["Aroma"]));

const styles = {"fill": {"fill": (d, i) => colorScale(d.Aroma)}};

newYThreshold.selection(scatterpoints).updateStyles(styles);

draft.layer("#svg")
  .x("Flavor", xScale)
  .y("Aroma", yScale)
  .exclude({"name":["label"]})
  .augment(newYThreshold.getAugs());
`