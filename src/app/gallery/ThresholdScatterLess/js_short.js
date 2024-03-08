export const js_short = `import { Draft, Threshold } from "auteur";

let yThreshold = 8;

const draft = new Draft();
const newYThreshold = new Threshold("Flavor", yThreshold, "leq");

let colorScale = d3.scaleSequential(d3.interpolateViridis)
                  .domain(d3.extent(data, d => d["Aroma"]));

const styles = {"fill": {"fill": (d, i) => colorScale(d.Aroma)}};

newYThreshold.updateStyles(styles);

draft.layer("#svg")
    .selection(scatterpoints)
    .x("Aroma", xScale)
    .y("Flavor", yScale)
    .include({"name":["line", "fill", "stroke", "opacity", "text"]})
    .augment(newYThreshold.getAugs());

`